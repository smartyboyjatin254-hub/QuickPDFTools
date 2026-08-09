import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Zap, Lock, MousePointerClick, Cpu, Sparkles,
  Star, Upload, Settings2, Download, Clock,
} from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { ToolGlyph } from '@/components/Navbar';
import { useSeo } from '@/hooks/useSeo';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS } from '@/data/faqs';
import { BLOG_POSTS } from '@/data/blog';

const testimonials = [
  { name: 'Sarah K.', role: 'Marketing Manager', text: 'I compress images for our newsletter every week. QuickPDF Tools is the fastest one I have found, and I love that nothing leaves my computer.', rating: 5 },
  { name: 'David L.', role: 'Freelance Designer', text: 'The JPG to PNG converter is perfect for client logos. Clean, simple, and the batch download saves me real time every day.', rating: 5 },
  { name: 'Priya M.', role: 'Student', text: 'Merging lecture PDFs before exams used to be a pain. This does it in seconds and the order is always right.', rating: 5 },
  { name: 'Tom R.', role: 'Small Business Owner', text: 'No sign-up, no upload, no nonsense. I converted a folder of product photos to a single PDF in under a minute.', rating: 5 },
];

const steps = [
  { icon: Upload, title: 'Drop your files', desc: 'Drag & drop or click to add images or PDFs. Add as many as you need.' },
  { icon: Settings2, title: 'Pick your options', desc: 'Choose compression level, dimensions, or output format. Defaults work great.' },
  { icon: Download, title: 'Download instantly', desc: 'Processed in your browser. Download one file or all as a ZIP — no waiting.' },
];

const features = [
  { icon: ShieldCheck, title: '100% Private', desc: 'Files are processed locally and never uploaded to any server.' },
  { icon: Zap, title: 'Lightning fast', desc: 'No upload time means results appear almost instantly.' },
  { icon: Lock, title: 'No login required', desc: 'Use every tool without creating an account or sharing your email.' },
  { icon: Cpu, title: 'Works offline-ready', desc: 'After the first load, tools run entirely on your device.' },
];

export default function HomePage() {
  const seo = useSeo({
    title: 'Free PDF & Image Tools That Save Your Time',
    description:
      'Compress, convert, resize and merge PDF and image files in seconds. Free, private, and lightning-fast online tools. No login required. Works right in your browser.',
    canonical: 'https://quickpdftools.app/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'QuickPDF Tools',
        url: 'https://quickpdftools.app/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://quickpdftools.app/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  });

  return (
    <div>
      {seo}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 dark:opacity-30" aria-hidden />
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
        <div className="container-wide relative pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow animate-fade-in">
              <Sparkles className="h-3.5 w-3.5" /> Fast • Private • Free
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white animate-fade-up">
              Free PDF &amp; Image Tools That <span className="text-gradient">Save Your Time</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Compress, convert, resize and merge files in seconds. Everything runs right in your browser — no uploads, no sign-ups, no waiting.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Link to="/tools" className="btn-primary px-7 py-3 text-base">
                Start Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/tools/image-compressor" className="btn-secondary px-7 py-3 text-base">
                Try the Compressor
              </Link>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Lock className="h-4 w-4 text-success-500" />
              Files never leave your device. 100% private.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16" aria-labelledby="tools-heading">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Popular Tools</span>
            <h2 id="tools-heading" className="section-title">Everything you need, in one place</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
              Six powerful tools covering the most common PDF and image tasks, with more on the way.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t, i) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="card group relative flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent} text-white shadow-soft`}>
                    <ToolGlyph name={t.icon} className="h-6 w-6" />
                  </span>
                  <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {t.short}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{t.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-slate-500 dark:text-slate-400">{t.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700 dark:text-brand-400">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 dark:bg-slate-900/50" aria-labelledby="why-heading">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Why Choose Us</span>
            <h2 id="why-heading" className="section-title">Built for speed, privacy, and trust</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div key={f.title} className="card p-6 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16" aria-labelledby="how-heading">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">How it Works</span>
            <h2 id="how-heading" className="section-title">Three steps, done in seconds</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative card p-6 text-center animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lift">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="absolute right-5 top-5 text-3xl font-bold text-slate-100 dark:text-slate-800">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16 dark:bg-slate-900/50" aria-labelledby="testimonials-heading">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Testimonials</span>
            <h2 id="testimonials-heading" className="section-title">Loved by people who work with files every day</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <div key={t.name} className="card flex flex-col p-6 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" aria-labelledby="faq-heading">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">FAQ</span>
            <h2 id="faq-heading" className="section-title">Frequently asked questions</h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* Latest Blog */}
      <section className="bg-white py-16 dark:bg-slate-900/50" aria-labelledby="blog-heading">
        <div className="container-wide">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="section-eyebrow">Latest Blog</span>
              <h2 id="blog-heading" className="section-title">Tips, guides &amp; PDF know-how</h2>
            </div>
            <Link to="/blog" className="hidden btn-secondary sm:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card group flex flex-col overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative h-40 bg-gradient-to-br from-brand-500 to-brand-700">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <span className="absolute left-4 top-4 badge bg-white/90 text-brand-700">{post.category}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to save time on your files?</h2>
              <p className="mx-auto mt-3 max-w-xl text-brand-100">
                No sign-up. No upload. No watermark. Just fast, private tools that work.
              </p>
              <Link to="/tools" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-semibold text-brand-700 shadow-lift transition-transform hover:scale-105">
                <MousePointerClick className="h-5 w-5" /> Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
