import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AboutPage() {
  const seo = useSeo({
    title: 'About QuickPDF Tools — Our Mission & Story',
    description:
      'QuickPDF Tools is on a mission to make PDF and image tasks effortless. Learn about our story, our values, and why we built a private, browser-based toolkit.',
    canonical: 'https://quickpdftools.app/about',
  });

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="mx-auto max-w-3xl">
        <h1 className="section-title">About QuickPDF Tools</h1>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          We believe everyday file tasks should be effortless, private, and instant.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <Target className="h-5 w-5 text-brand-500" /> Our mission
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Most online PDF and image tools are slow, ad-cluttered, and ask you to upload your personal files to a stranger’s server. We set out to build the opposite: a toolkit that is fast, clean, trustworthy, and keeps your files on your device by design.
            </p>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <Eye className="h-5 w-5 text-brand-500" /> Our vision
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A single, reliable home for every common file task — from compressing a photo to merging a contract — that works the same on a phone or a laptop, with no installs and no sign-ups. We are steadily expanding the toolkit toward that goal.
            </p>
          </section>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: Zap, title: 'Speed first', desc: 'No upload means no waiting. Results appear in seconds.' },
              { icon: ShieldCheck, title: 'Privacy by default', desc: 'Your files never leave your device. Nothing to store, nothing to leak.' },
              { icon: Heart, title: 'Truly free', desc: 'Every core tool is free with no watermark, no sign-up, no catch.' },
            ].map((v) => (
              <div key={v.title} className="card p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-400">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{v.title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <Users className="h-5 w-5 text-brand-500" /> Who we build for
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Designers compressing assets, students merging lecture notes, marketers prepping images for newsletters, small business owners organizing invoices — anyone who needs a quick file task done without friction. If that sounds like you, you are in the right place.
            </p>
          </section>

          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">Try the tools</h2>
            <p className="mt-2 text-brand-100">Jump straight in — no account needed.</p>
            <Link to="/tools" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:scale-105 transition-transform">
              Explore tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
