import { Link } from 'react-router-dom';
import { FileStack, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { TOOLS } from '@/data/tools';

const legal = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="container-wide py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5" aria-label="QuickPDF Tools home">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <FileStack className="h-5 w-5" />
              </span>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                QuickPDF<span className="text-brand-600 dark:text-brand-400"> Tools</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              The fastest, cleanest online PDF &amp; image toolkit. Everything runs in your browser — private, free, and instant.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-700 dark:hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Tools</h3>
            <ul className="mt-4 space-y-2.5">
              {TOOLS.map((t) => (
                <li key={t.id}>
                  <Link to={`/tools/${t.id}`} className="link-quiet text-sm">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-quiet text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="link-quiet text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Stay in the loop</h3>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              New tools and tips, straight to your inbox. No spam, ever.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="input"
              />
              <button type="submit" className="btn-primary shrink-0">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} QuickPDF Tools. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-success-500" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
