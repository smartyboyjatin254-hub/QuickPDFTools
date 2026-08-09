import { useCallback, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { UploadCloud } from 'lucide-react';

type DropzoneProps = {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title: string;
  hint?: string;
  icon?: ReactNode;
  disabled?: boolean;
};

const MAX_SIZE_MB = 100;

export default function Dropzone({
  accept,
  multiple = true,
  onFiles,
  title,
  hint,
  icon,
  disabled,
}: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const accepted = Array.from(fileList).filter((f) => {
        if (f.size > MAX_SIZE_MB * 1024 * 1024) return false;
        return true;
      });
      if (accepted.length === 0) return;
      onFiles(multiple ? accepted : [accepted[0]]);
    },
    [onFiles, multiple],
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
        dragging
          ? 'border-brand-500 bg-brand-50/60 scale-[1.01] dark:bg-brand-950/30'
          : 'border-slate-300 bg-slate-50/50 hover:border-brand-400 hover:bg-brand-50/30 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:border-brand-600 dark:hover:bg-brand-950/20'
      } ${disabled ? 'pointer-events-none opacity-60' : ''}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lift transition-transform duration-200 ${dragging ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon ?? <UploadCloud className="h-8 w-8" />}
      </div>
      <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</p>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {hint ?? 'Drag & drop or click to browse. Up to 100MB per file.'}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors group-hover:bg-brand-700">
        <UploadCloud className="h-4 w-4" />
        Select files
      </span>
    </div>
  );
}
