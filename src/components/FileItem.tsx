import { useEffect, useState } from 'react';
import { Download, Trash2, Check, Loader2, ImageOff } from 'lucide-react';
import { formatBytes, compressionPercent, downloadBlob } from '@/utils/file';
import { loadImage } from '@/utils/image';
import ProgressBar from './ProgressBar';

export type ProcessedFile = {
  id: string;
  original: File;
  result?: Blob;
  resultName?: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  error?: string;
  previewUrl?: string;
  resultUrl?: string;
};

type FileItemProps = {
  item: ProcessedFile;
  onRemove: (id: string) => void;
  index: number;
};

export default function FileItem({ item, onRemove, index }: FileItemProps) {
  const [thumb, setThumb] = useState<string>('');

  useEffect(() => {
    let url = '';
    let cancelled = false;
    if (item.original.type.startsWith('image/')) {
      loadImage(item.original).then(() => {
        if (cancelled) return;
        url = URL.createObjectURL(item.original);
        setThumb(url);
      }).catch(() => {});
    }
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [item.original]);

  const saved = item.result && item.original.size > 0
    ? compressionPercent(item.original.size, item.result.size)
    : 0;

  return (
    <li className="card group flex items-center gap-4 p-4 animate-fade-up">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        {thumb ? (
          <img src={thumb} alt={item.original.name} className="h-full w-full object-cover" loading="lazy" />
        ) : item.original.type === 'application/pdf' ? (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-brand-600 dark:text-brand-400">PDF</div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-5 w-5" />
          </div>
        )}
        <span className="absolute left-1 top-1 rounded bg-slate-900/70 px-1 text-[10px] font-bold text-white">{index + 1}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{item.original.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{formatBytes(item.original.size)}</span>
          {item.result && (
            <>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{formatBytes(item.result.size)}</span>
              {saved > 0 && (
                <span className="badge bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300">
                  <Check className="h-3 w-3" /> {saved}% smaller
                </span>
              )}
            </>
          )}
        </div>
        {item.status === 'processing' && (
          <div className="mt-2 max-w-xs">
            <ProgressBar value={60} />
          </div>
        )}
        {item.status === 'error' && (
          <p className="mt-1 text-xs text-error-600 dark:text-error-400">{item.error ?? 'Processing failed'}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {item.result && (
          <button
            onClick={() => item.result && downloadBlob(item.result, item.resultName ?? item.original.name)}
            className="btn-primary !px-3 !py-2 text-xs"
            aria-label={`Download ${item.resultName ?? item.original.name}`}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        )}
        {item.status === 'processing' && <Loader2 className="h-5 w-5 animate-spin text-brand-500" />}
        <button
          onClick={() => onRemove(item.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-950/40"
          aria-label={`Remove ${item.original.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
