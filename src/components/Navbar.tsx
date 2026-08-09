import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FileStack, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TOOLS } from '@/data/tools';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'Tools' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setToolsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/85 backdrop-blur-lg dark:border-slate-800/70 dark:bg-slate-950/85'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="QuickPDF Tools home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
            <FileStack className="h-5 w-5" />
          </span>
          <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
            QuickPDF<span className="text-brand-600 dark:text-brand-400"> Tools</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.label === 'Tools' ? (
              <div
                key="tools"
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <NavLink
                  to="/tools"
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                    }`
                  }
                >
                  Tools
                </NavLink>
                {toolsOpen && (
                  <div className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-2">
                    <div className="card grid grid-cols-2 gap-1 p-3 animate-fade-up">
                      {TOOLS.map((t) => (
                        <Link
                          key={t.id}
                          to={`/tools/${t.id}`}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <span className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${t.accent} text-white`}>
                            <ToolGlyph name={t.icon} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400">{t.short}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="btn-ghost h-10 w-10 !p-0"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/tools" className="btn-primary hidden sm:inline-flex">
            Start Now
          </Link>
          <button
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="btn-ghost h-10 w-10 !p-0 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="container-wide space-y-1 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                      : 'text-slate-600 dark:text-slate-300'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">All tools</div>
            {TOOLS.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.id}`}
                className="block rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

import type { LucideIcon } from 'lucide-react';
import {
  Minimize2, Scaling, FileImage, ImageDown, FilePlus2, Layers,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Minimize2, Scaling, FileImage, ImageDown, FilePlus2, Layers,
};

export function ToolGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? FileImage;
  return <Icon className={className ?? 'h-4 w-4'} />;
}
