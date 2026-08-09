export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Are QuickPDF Tools really free?',
    a: 'Yes. Every tool on QuickPDF Tools is completely free with no hidden costs, no sign-up, and no watermarks. We may add an optional premium plan in the future for advanced features, but the core toolkit will always stay free.',
  },
  {
    q: 'Do you store my files?',
    a: 'No. All processing happens directly in your browser using JavaScript and WebAssembly. Your files never leave your device, so there is nothing to store, nothing to leak, and nothing to delete. Privacy is built in by design.',
  },
  {
    q: 'Is there a file size limit?',
    a: 'For images we recommend files under 50MB each, and for PDFs under 100MB, which covers virtually all everyday use. Because processing happens on your device, the practical limit depends on your computer’s memory rather than an arbitrary server cap.',
  },
  {
    q: 'Which browsers are supported?',
    a: 'QuickPDF Tools works in all modern browsers: Chrome, Edge, Firefox, Safari, and their mobile equivalents. JavaScript and WebAssembly must be enabled, which is the default everywhere.',
  },
  {
    q: 'Can I process multiple files at once?',
    a: 'Yes. Every tool supports batch processing. Drop in several files, adjust the settings once, and download all the results together — either individually or as a single ZIP archive.',
  },
  {
    q: 'Will my files look different after compression?',
    a: 'Our compressor is tuned to reduce file size while keeping images visually identical for almost all uses. You can choose a quality level, and a before/after preview lets you confirm the result before you download.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. QuickPDF Tools runs entirely in your browser. There is nothing to download, install, or update. Bookmark the page and you are ready whenever you need it.',
  },
  {
    q: 'Can I use QuickPDF Tools on my phone?',
    a: 'Absolutely. The entire site is mobile-optimized with touch-friendly drop zones and large tap targets. You can compress, convert, and merge files from your phone just as easily as from a laptop.',
  },
];
