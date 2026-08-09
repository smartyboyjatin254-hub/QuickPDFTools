import { useState } from 'react';
import { getTool } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import ToolLayout from '@/components/ToolLayout';
import { resizeImage } from '@/utils/image';
import { stripExtension } from '@/utils/file';
import type { ProcessedFile } from '@/components/FileItem';
import { Scaling } from 'lucide-react';

const tool = getTool('image-resizer')!;

const PRESETS = [
  { label: 'Original', w: '', h: '' },
  { label: '1920 × 1080', w: '1920', h: '1080' },
  { label: '1280 × 720', w: '1280', h: '720' },
  { label: '800 × 600', w: '800', h: '600' },
  { label: '500 × 500', w: '500', h: '500' },
];

export default function ImageResizerPage() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [percent, setPercent] = useState('');

  const seo = useSeo({
    title: 'Image Resizer — Resize JPG & PNG to Any Size Online',
    description:
      'Resize images to exact pixel dimensions or scale by percentage. Free, private, and instant in your browser. No upload, no login.',
    canonical: `https://quickpdftools.app/tools/${tool.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Image Resizer',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  const controls = (
    <div className="card space-y-4 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <Scaling className="h-4 w-4 text-accent-500" /> Dimensions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Width (px)</span>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="auto"
            className="input"
            min={1}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Height (px)</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="auto"
            className="input"
            min={1}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Or scale by %</span>
        <input
          type="number"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="50"
          className="input"
          min={1}
          max={400}
        />
      </label>

      <div>
        <span className="mb-2 block text-xs font-medium text-slate-500 dark:text-slate-400">Presets</span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setWidth(p.w);
                setHeight(p.h);
                setPercent('');
              }}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const handleProcess = async (files: File[]): Promise<ProcessedFile[]> => {
    const w = width ? parseInt(width, 10) : undefined;
    const h = height ? parseInt(height, 10) : undefined;
    const pct = percent ? parseInt(percent, 10) : undefined;
    if (!w && !h && !pct) {
      throw new Error('Enter a width, height, or percentage to resize.');
    }
    const results: ProcessedFile[] = [];
    for (const file of files) {
      try {
        const out = await resizeImage(file, { width: w, height: h, percent: pct });
        const ext = file.type === 'image/png' ? 'png' : 'jpg';
        results.push({
          id: file.name,
          original: file,
          result: out,
          resultName: `${stripExtension(file.name)}-resized.${ext}`,
          status: 'done',
        });
      } catch {
        results.push({ id: file.name, original: file, status: 'error', error: 'Resize failed' });
      }
    }
    return results;
  };

  return (
    <ToolLayout
      tool={tool}
      seo={seo}
      controls={controls}
      primaryLabel="Resize images"
      onProcess={handleProcess}
    />
  );
}
