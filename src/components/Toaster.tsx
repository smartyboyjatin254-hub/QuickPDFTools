import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lift animate-scale-in dark:border-slate-700 dark:bg-slate-900"
        >
          {t.variant === 'success' && <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />}
          {t.variant === 'error' && <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error-500" />}
          {t.variant === 'info' && <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />}
          <p className="flex-1 text-sm text-slate-700 dark:text-slate-200">{t.message}</p>
          <button
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
