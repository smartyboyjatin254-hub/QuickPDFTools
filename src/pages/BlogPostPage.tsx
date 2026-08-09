import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { getPost, BLOG_POSTS } from '@/data/blog';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug ?? '');

  const seo = useSeo({
    title: post ? `${post.title}` : 'Article Not Found',
    description: post?.excerpt ?? 'Article not found.',
    canonical: `https://quickpdftools.app/blog/${slug}`,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          keywords: post.keywords.join(', '),
          author: { '@type': 'Organization', name: 'QuickPDF Tools' },
          publisher: {
            '@type': 'Organization',
            name: 'QuickPDF Tools',
            url: 'https://quickpdftools.app/',
          },
          mainEntityOfPage: `https://quickpdftools.app/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} />

      <article className="mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="badge bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">{post.category}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{post.excerpt}</p>

        <div className="mt-8 space-y-5 text-slate-700 dark:text-slate-300">
          {post.content.map((para, i) => (
            <p key={i} className="leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-center text-white">
          <h2 className="text-xl font-bold">Try the tools mentioned in this article</h2>
          <p className="mt-2 text-brand-100">Free, private, and instant — right in your browser.</p>
          <Link to="/tools" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-brand-700 hover:scale-105 transition-transform">
            Explore tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mx-auto mt-14 max-w-3xl">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Related articles</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="card group p-5">
                <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{r.category}</span>
                <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">{r.title}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
