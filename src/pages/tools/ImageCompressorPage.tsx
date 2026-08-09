import { useState } from 'react';
import { getTool } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import ToolLayout from '@/components/ToolLayout';
import { compressImage } from '@/utils/image';
import { stripExtension } from '@/utils/file';
import type { ProcessedFile } from '@/components/FileItem';
import { Gauge } from 'lucide-react';

const tool = getTool('image-compressor')!;

const LEVELS = [
  { label: 'High', value: 0.82, desc: 'Best quality, moderate compression' },
  { label: 'Balanced', value: 0.7, desc: 'Recommended for most images' },
  { label: 'Max', value: 0.5, desc: 'Smallest size, lower quality' },
];

export default function ImageCompressorPage() {
  const [level, setLevel] = useState(1);

  const seo = useSeo({
    title: 'Image Compressor — Reduce JPG & PNG Size Online Free',
    description:
      'Compress JPG, PNG and WebP images up to 80% smaller with almost no visible quality loss. Free, private, in-browser. No upload, no login.',
    canonical: `https://quickpdftools.app/tools/${tool.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Image Compressor',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const controls = (
    <div className="card p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <Gauge className="h-4 w-4 text-brand-500" /> Compression level
      </h3>
      <div className="mt-4 space-y-2">
        {LEVELS.map((l, i) => (
          <button
            key={l.label}
            onClick={() => setLevel(i)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
              level === i
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40'
                : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
            }`}
          >
            <span>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{l.label}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{l.desc}</span>
            </span>
            <span
              className={`h-4 w-4 rounded-full border-2 ${
                level === i ? 'border-brand-600 bg-brand-600' : 'border-slate-300 dark:border-slate-600'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const handleProcess = async (files: File[]): Promise<ProcessedFile[]> => {
    const results: ProcessedFile[] = [];
    for (const file of files) {
      try {
        const out = await compressImage(file, { quality: LEVELS[level].value });
        results.push({
          id: file.name,
          original: file,
          result: out,
          resultName: `${stripExtension(file.name)}-compressed.${file.type === 'image/png' ? 'png' : 'jpg'}`,
          status: 'done',
        });
      } catch {
        results.push({ id: file.name, original: file, status: 'error', error: 'Compression failed' });
      }
    }
    return results;
  };

  return (
    <ToolLayout
      tool={tool}
      seo={seo}
      controls={controls}
      primaryLabel="Compress images"
      onProcess={handleProcess}
    />
  );
}
