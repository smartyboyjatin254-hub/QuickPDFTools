export type ToolId =
  | 'image-compressor'
  | 'image-resizer'
  | 'jpg-to-png'
  | 'png-to-jpg'
  | 'image-to-pdf'
  | 'merge-pdf';

export type ToolCategory = 'image' | 'pdf';

export type Tool = {
  id: ToolId;
  name: string;
  short: string;
  description: string;
  category: ToolCategory;
  accept: string;
  multiple: boolean;
  icon: string;
  accent: string;
  comingSoon?: boolean;
};

export const TOOLS: Tool[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    short: 'Compress',
    description: 'Shrink JPG and PNG file sizes up to 80% with almost no visible quality loss.',
    category: 'image',
    accept: 'image/jpeg,image/png,image/webp',
    multiple: true,
    icon: 'Minimize2',
    accent: 'from-brand-500 to-brand-700',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    short: 'Resize',
    description: 'Resize images to exact pixel dimensions or scale by percentage in one click.',
    category: 'image',
    accept: 'image/jpeg,image/png,image/webp',
    multiple: true,
    icon: 'Scaling',
    accent: 'from-accent-500 to-accent-700',
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    short: 'JPG→PNG',
    description: 'Convert JPG and JPEG photos into transparent-ready PNG images instantly.',
    category: 'image',
    accept: 'image/jpeg',
    multiple: true,
    icon: 'FileImage',
    accent: 'from-success-500 to-success-700',
  },
  {
    id: 'png-to-jpg',
    name: 'PNG to JPG',
    short: 'PNG→JPG',
    description: 'Convert PNG images to smaller JPG files with a white background fill.',
    category: 'image',
    accept: 'image/png',
    multiple: true,
    icon: 'ImageDown',
    accent: 'from-warning-500 to-warning-700',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    short: 'Img→PDF',
    description: 'Combine multiple images into a single, clean PDF document in seconds.',
    category: 'pdf',
    accept: 'image/jpeg,image/png,image/webp',
    multiple: true,
    icon: 'FilePlus2',
    accent: 'from-brand-500 to-accent-600',
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    short: 'Merge',
    description: 'Combine several PDF files into one organized document in the order you choose.',
    category: 'pdf',
    accept: 'application/pdf',
    multiple: true,
    icon: 'Layers',
    accent: 'from-brand-600 to-brand-900',
  },
];

export const COMING_SOON_TOOLS: { name: string; icon: string }[] = [
  { name: 'PDF Split', icon: 'Scissors' },
  { name: 'PDF Compress', icon: 'Archive' },
  { name: 'PDF Rotate', icon: 'RotateCw' },
  { name: 'PDF Watermark', icon: 'Stamp' },
  { name: 'PDF to Word', icon: 'FileType' },
  { name: 'Word to PDF', icon: 'FileType2' },
  { name: 'Excel to PDF', icon: 'Sheet' },
  { name: 'PowerPoint to PDF', icon: 'Presentation' },
  { name: 'OCR', icon: 'ScanText' },
  { name: 'AI PDF Summary', icon: 'Sparkles' },
  { name: 'Background Remover', icon: 'Eraser' },
  { name: 'QR Generator', icon: 'QrCode' },
  { name: 'Signature Maker', icon: 'PenTool' },
];

export function getTool(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}
