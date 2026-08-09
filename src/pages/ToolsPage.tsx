import { Link } from 'react-router-dom';
import { TOOLS, COMING_SOON_TOOLS } from '@/data/tools';
import { useSeo } from '@/hooks/useSeo';
import { ToolGlyph } from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ArrowRight, Lock } from 'lucide-react';

export default function ToolsPage() {
  const seo = useSeo({
    title: 'All PDF & Image Tools — Free Online Toolkit',
    description:
      'Browse every free QuickPDF tool: image compressor, resizer, JPG↔PNG converter, image to PDF, and PDF merger. Private, instant, no login.',
    canonical: 'https://quickpdftools.app/tools',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: TOOLS.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: `https://quickpdftools.app/tools/${t.id}`,
      })),
    },
  });

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Tools' }]} />

      <div className="mb-8">
        <h1 className="section-title">All Tools</h1>
        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-400">
          Every tool runs entirely in your browser. No uploads, no sign-ups, no waiting — just drop your files and go.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t, i) => (
          <Link
            key={t.id}
            to={`/tools/${t.id}`}
            className="card group relative flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent} text-white shadow-soft`}>
                <ToolGlyph name={t.icon} className="h-6 w-6" />
              </span>
              <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {t.category === 'image' ? 'Image' : 'PDF'}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{t.name}</h2>
            <p className="mt-1.5 flex-1 text-sm text-slate-500 dark:text-slate-400">{t.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-400">
              Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Coming soon</h2>
          <span className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">In development</span>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          We are constantly expanding the toolkit. Here is what is on the roadmap.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COMING_SOON_TOOLS.map((t) => (
            <div
              key={t.name}
              className="card flex items-center gap-3 p-4 opacity-70"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800">
                <ToolGlyph name={t.icon} className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.name}</span>
              <Lock className="ml-auto h-3.5 w-3.5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
