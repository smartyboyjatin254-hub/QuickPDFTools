import { useState, type FormEvent } from 'react';
import { Mail, MessageSquare, Send, MapPin, Clock } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { notify } = useToast();
  const [sending, setSending] = useState(false);

  const seo = useSeo({
    title: 'Contact QuickPDF Tools — Get in Touch',
    description:
      'Have a question, feature request, or feedback about QuickPDF Tools? Send us a message and we will get back to you.',
    canonical: 'https://quickpdftools.app/contact',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      notify('Thanks! Your message has been sent.', 'success');
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div className="container-wide py-10">
      {seo}
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="mx-auto max-w-4xl">
        <h1 className="section-title">Contact us</h1>
        <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          Questions, feedback, or a tool you would love to see? We would love to hear from you.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <form onSubmit={onSubmit} className="card space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</span>
                <input required type="text" className="input" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</span>
                <input required type="email" className="input" placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Subject</span>
              <input required type="text" className="input" placeholder="How can we help?" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</span>
              <textarea required rows={5} className="input resize-none" placeholder="Tell us more…" />
            </label>
            <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
              {sending ? 'Sending…' : 'Send message'} <Send className="h-4 w-4" />
            </button>
          </form>

          <aside className="space-y-4">
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Mail className="h-4 w-4 text-brand-500" /> Email
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">hello@quickpdftools.app</p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <MessageSquare className="h-4 w-4 text-brand-500" /> Response time
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">We usually reply within 1–2 business days.</p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <MapPin className="h-4 w-4 text-brand-500" /> Location
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Remote-first, serving users worldwide.</p>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <Clock className="h-4 w-4 text-brand-500" /> Hours
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">The tools are available 24/7. Support is staffed on weekdays.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
