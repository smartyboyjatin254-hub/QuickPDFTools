import { getTool } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import ToolLayout from '@/components/ToolLayout';
import { convertImage } from '@/utils/image';
import { stripExtension } from '@/utils/file';
import type { ProcessedFile } from '@/components/FileItem';

const tool = getTool('jpg-to-png')!;

export default function JpgToPngPage() {
  const seo = useSeo({
    title: 'JPG to PNG Converter — Free Online Image Converter',
    description:
      'Convert JPG and JPEG photos to PNG images instantly in your browser. Free, private, no upload, no login. Batch convert multiple files.',
    canonical: `https://quickpdftools.app/tools/${tool.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'JPG to PNG Converter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const controls = (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">How it works</h3>
      <ol className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
        <li>1. Add one or more JPG/JPEG files.</li>
        <li>2. Click <strong>Convert</strong>.</li>
        <li>3. Download your PNG files instantly.</li>
      </ol>
      <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
        PNG preserves every pixel losslessly and supports transparency — ideal for logos, screenshots, and graphics.
      </p>
    </div>
  );

  const handleProcess = async (files: File[]): Promise<ProcessedFile[]> => {
    const results: ProcessedFile[] = [];
    for (const file of files) {
      try {
        const out = await convertImage(file, 'image/png');
        results.push({
          id: file.name,
          original: file,
          result: out,
          resultName: `${stripExtension(file.name)}.png`,
          status: 'done',
        });
      } catch {
        results.push({ id: file.name, original: file, status: 'error', error: 'Conversion failed' });
      }
    }
    return results;
  };

  return (
    <ToolLayout
      tool={tool}
      seo={seo}
      controls={controls}
      primaryLabel="Convert to PNG"
      onProcess={handleProcess}
    />
  );
}
