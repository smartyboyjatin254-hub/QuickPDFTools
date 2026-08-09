import { useState, useCallback, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Download, Trash2, Lock, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import type { Tool } from '@/data/tools';
import { ToolGlyph } from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Dropzone from '@/components/Dropzone';
import FileItem, { type ProcessedFile } from '@/components/FileItem';
import { downloadBlob, uniqueId } from '@/utils/file';
import { useToast } from '@/context/ToastContext';

type ToolLayoutProps = {
  tool: Tool;
  seo: ReactNode;
  controls: ReactNode;
  primaryLabel: string;
  onProcess: (files: File[]) => Promise<ProcessedFile[]>;
  downloadAll?: (items: ProcessedFile[]) => Promise<void>;
  acceptHint?: string;
};

export default function ToolLayout({
  tool,
  seo,
  controls,
  primaryLabel,
  onProcess,
  downloadAll,
  acceptHint,
}: ToolLayoutProps) {
  const { notify } = useToast();
  const [items, setItems] = useState<ProcessedFile[]>([]);
  const [busy, setBusy] = useState(false);

  const addFiles = useCallback(
    (files: File[]) => {
      setItems((prev) => {
        const next = [...prev];
        for (const f of files) {
          next.push({ id: uniqueId(), original: f, status: 'pending' });
        }
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const move = (id: string, dir: -1 | 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === id);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  };

  const run = async () => {
    if (items.length === 0) {
      notify('Add at least one file first.', 'error');
      return;
    }
    setBusy(true);
    setItems((prev) => prev.map((p) => ({ ...p, status: 'processing' as const })));
    try {
      const results = await onProcess(items.map((i) => i.original));
      setItems((prev) =>
        prev.map((p, idx) => {
          const r = results[idx];
          if (!r) return p;
          return {
            ...p,
            status: r.status,
            result: r.result,
            resultName: r.resultName,
            error: r.error,
            resultUrl: r.result ? URL.createObjectURL(r.result) : undefined,
          };
        }),
      );
      const ok = results.filter((r) => r.status === 'done').length;
      const fail = results.filter((r) => r.status === 'error').length;
      if (fail && !ok) notify('Processing failed. Please try again.', 'error');
      else if (fail) notify(`${ok} done, ${fail} failed.`, 'info');
      else notify(`${ok} file${ok === 1 ? '' : 's'} processed.`, 'success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setItems((prev) => prev.map((p) => ({ ...p, status: 'error' as const, error: msg })));
      notify(msg, 'error');
    } finally {
      setBusy(false);
    }
  };

  const handleDownloadAll = async () => {
    const done = items.filter((i) => i.result);
    if (done.length === 0) return;
    if (downloadAll) {
      await downloadAll(done);
    } else if (done.length === 1 && done[0].result) {
      downloadBlob(done[0].result, done[0].resultName ?? done[0].original.name);
    } else {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      for (const item of done) {
        if (!item.result) continue;
        zip.file(item.resultName ?? item.original.name, item.result);
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(blob, `${tool.id}-results.zip`);
    }
  };

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Tools', to: '/tools' }, { label: tool.name }]} />

      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.accent} text-white shadow-lift`}>
          <ToolGlyph name={tool.icon} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">{tool.name}</h1>
          <p className="mt-1 max-w-2xl text-slate-500 dark:text-slate-400">{tool.description}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <Dropzone
              accept={tool.accept}
              multiple={tool.multiple}
              onFiles={addFiles}
              title={`Drop ${tool.category === 'image' ? 'images' : 'PDFs'} here`}
              hint={acceptHint}
              icon={<ToolGlyph name={tool.icon} className="h-8 w-8" />}
            />
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {items.length} file{items.length === 1 ? '' : 's'} ready
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={clearAll} className="btn-secondary !py-2 text-xs" disabled={busy}>
                    <Trash2 className="h-3.5 w-3.5" /> Clear all
                  </button>
                  <DropzoneTrigger accept={tool.accept} multiple={tool.multiple} onFiles={addFiles} disabled={busy} />
                </div>
              </div>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <FileItem key={item.id} item={item} index={i} onRemove={removeItem} />
                ))}
              </ul>
              {tool.id === 'merge-pdf' && items.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <p>Order matters — drag to reorder:</p>
                  {items.map((it, i) => (
                    <span key={it.id} className="flex items-center gap-1">
                      <button onClick={() => move(it.id, -1)} disabled={i === 0 || busy} className="rounded px-1 hover:bg-slate-100 dark:hover:bg-slate-800">↑</button>
                      <button onClick={() => move(it.id, 1)} disabled={i === items.length - 1 || busy} className="rounded px-1 hover:bg-slate-100 dark:hover:bg-slate-800">↓</button>
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {items.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Sparkles className="h-4 w-4 text-brand-500" />
                Ready to process {items.length} file{items.length === 1 ? '' : 's'}
              </div>
              <div className="flex items-center gap-2">
                {items.some((i) => i.result) && (
                  <button onClick={handleDownloadAll} className="btn-secondary !py-2.5 text-sm">
                    <Download className="h-4 w-4" /> Download all
                  </button>
                )}
                <button onClick={run} disabled={busy} className="btn-primary !py-2.5 text-sm">
                  {busy ? 'Processing…' : primaryLabel}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          {controls}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Why it’s safe</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success-500" />
                Files never leave your device. 100% private.
              </li>
              <li className="flex items-start gap-2.5">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning-500" />
                Processed instantly in your browser.
              </li>
              <li className="flex items-start gap-2.5">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                Nothing is uploaded, stored, or tracked.
              </li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Related tools</h3>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {(['image-compressor', 'image-resizer', 'jpg-to-png', 'png-to-jpg', 'image-to-pdf', 'merge-pdf'] as const)
                .filter((id) => id !== tool.id)
                .slice(0, 4)
                .map((id) => (
                  <Link
                    key={id}
                    to={`/tools/${id}`}
                    className="flex items-center gap-2.5 rounded-xl p-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <ToolGlyph name={TOOLS_MAP[id]} className="h-4 w-4 text-brand-500" />
                    <span className="capitalize">{id.replace(/-/g, ' ')}</span>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { TOOLS } from '@/data/tools';

const TOOLS_MAP: Record<string, string> = Object.fromEntries(TOOLS.map((t) => [t.id, t.icon]));

function DropzoneTrigger({
  accept,
  multiple,
  onFiles,
  disabled,
}: {
  accept: string;
  multiple: boolean;
  onFiles: (f: File[]) => void;
  disabled?: boolean;
}) {
  return (
    <label className={`btn-secondary !py-2 text-xs ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      + Add files
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) onFiles(Array.from(e.target.files));
          e.target.value = '';
        }}
      />
    </label>
  );
}
