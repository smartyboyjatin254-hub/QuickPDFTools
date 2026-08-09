import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';

export default function NotFoundPage() {
  const seo = useSeo({
    title: 'Page Not Found — QuickPDF Tools',
    description: 'The page you were looking for could not be found.',
    canonical: 'https://quickpdftools.app/404',
  });

  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      {seo}
      <p className="text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
        The page you are looking for may have moved or never existed. Let’s get you back on track.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" /> Go home
        </Link>
        <Link to="/tools" className="btn-secondary">
          <ArrowLeft className="h-4 w-4" /> Browse tools
        </Link>
      </div>
    </div>
  );
}
