import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const location = useLocation();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://quickpdftools.app/' },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.label,
        item: item.to ? `https://quickpdftools.app${item.to}` : `https://quickpdftools.app${location.pathname}`,
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <li>
            <Link to="/" className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400">
              <Home className="h-3.5 w-3.5" />
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
              {item.to ? (
                <Link to={item.to} className="hover:text-brand-600 dark:hover:text-brand-400">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
