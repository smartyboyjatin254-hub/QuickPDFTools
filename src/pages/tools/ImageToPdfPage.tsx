import { getTool } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import ToolLayout from '@/components/ToolLayout';
import { imagesToPdf } from '@/utils/pdf';
import { stripExtension, downloadBlob } from '@/utils/file';
import type { ProcessedFile } from '@/components/FileItem';
import { FilePlus2, Info } from 'lucide-react';

const tool = getTool('image-to-pdf')!;

export default function ImageToPdfPage() {
  const seo = useSeo({
    title: 'Image to PDF — Convert JPG & PNG to PDF Online Free',
    description:
      'Combine multiple JPG, PNG, and WebP images into a single clean PDF document. Free, private, instant in-browser. No upload, no login.',
    canonical: `https://quickpdftools.app/tools/${tool.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Image to PDF Converter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const controls = (
    <div className="card space-y-3 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <FilePlus2 className="h-4 w-4 text-brand-500" /> Single PDF output
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        All selected images are combined into one PDF, with each image on its own page sized to match the original.
      </p>
      <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-xs text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        The order of files in the list determines the page order in the PDF.
      </div>
    </div>
  );

  const handleProcess = async (files: File[]): Promise<ProcessedFile[]> => {
    try {
      const bytes = await imagesToPdf(files);
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      return [
        {
          id: 'combined',
          original: files[0],
          result: blob,
          resultName: `${stripExtension(files[0].name)}-images.pdf`,
          status: 'done',
        },
      ];
    } catch (err) {
      return [{ id: 'combined', original: files[0], status: 'error', error: err instanceof Error ? err.message : 'Failed' }];
    }
  };

  const downloadAll = async (items: ProcessedFile[]) => {
    const done = items.find((i) => i.result);
    if (done?.result) downloadBlob(done.result, done.resultName ?? 'images.pdf');
  };

  return (
    <ToolLayout
      tool={tool}
      seo={seo}
      controls={controls}
      primaryLabel="Create PDF"
      onProcess={handleProcess}
      downloadAll={downloadAll}
    />
  );
}
