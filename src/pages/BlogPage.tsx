import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BlogPage() {
  const seo = useSeo({
    title: 'Blog — PDF & Image Tips, Guides & Tutorials',
    description:
      'Practical guides on compressing images, merging PDFs, choosing the right image format, and getting more from your files. New articles regularly.',
    canonical: 'https://quickpdftools.app/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'QuickPDF Tools Blog',
      url: 'https://quickpdftools.app/blog',
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        url: `https://quickpdftools.app/blog/${p.slug}`,
      })),
    },
  });

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="mb-10">
        <h1 className="section-title">The QuickPDF Blog</h1>
        <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          Practical tips, guides, and tutorials to help you get more out of your PDF and image files.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card group flex flex-col overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="relative h-44 bg-gradient-to-br from-brand-500 to-brand-700">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <span className="absolute left-4 top-4 badge bg-white/90 text-brand-700">{post.category}</span>
              <span className="absolute bottom-4 right-4 text-xs font-medium text-white/80">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-base font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
