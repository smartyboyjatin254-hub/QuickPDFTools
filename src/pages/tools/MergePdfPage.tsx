import { getTool } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import ToolLayout from '@/components/ToolLayout';
import { mergePdfs } from '@/utils/pdf';
import { stripExtension, downloadBlob } from '@/utils/file';
import type { ProcessedFile } from '@/components/FileItem';
import { Layers, Info } from 'lucide-react';

const tool = getTool('merge-pdf')!;

export default function MergePdfPage() {
  const seo = useSeo({
    title: 'Merge PDF — Combine PDF Files Online Free',
    description:
      'Combine multiple PDF files into one organized document in seconds. Free, private, instant in-browser. No upload, no login, no watermark.',
    canonical: `https://quickpdftools.app/tools/${tool.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Merge PDF',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const controls = (
    <div className="card space-y-3 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <Layers className="h-4 w-4 text-brand-500" /> Combine into one
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        All selected PDFs are merged into a single document in the order shown in the list. Use the arrows to reorder before merging.
      </p>
      <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-xs text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Password-protected PDFs cannot be merged. Remove passwords first if needed.
      </div>
    </div>
  );

  const handleProcess = async (files: File[]): Promise<ProcessedFile[]> => {
    try {
      const bytes = await mergePdfs(files);
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      return [
        {
          id: 'merged',
          original: files[0],
          result: blob,
          resultName: `${stripExtension(files[0].name)}-merged.pdf`,
          status: 'done',
        },
      ];
    } catch (err) {
      return [{ id: 'merged', original: files[0], status: 'error', error: err instanceof Error ? err.message : 'Merge failed' }];
    }
  };

  const downloadAll = async (items: ProcessedFile[]) => {
    const done = items.find((i) => i.result);
    if (done?.result) downloadBlob(done.result, done.resultName ?? 'merged.pdf');
  };

  return (
    <ToolLayout
      tool={tool}
      seo={seo}
      controls={controls}
      primaryLabel="Merge PDFs"
      onProcess={handleProcess}
      downloadAll={downloadAll}
    />
  );
}
