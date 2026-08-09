import imageCompression from 'browser-image-compression';

export type CompressOptions = {
  quality: number; // 0..1
  maxWidth?: number;
  maxHeight?: number;
};

export async function compressImage(file: File, opts: CompressOptions): Promise<File> {
  return imageCompression(file, {
    maxSizeMB: 100,
    maxWidthOrHeight: opts.maxWidth ?? 1920,
    initialQuality: opts.quality,
    useWebWorker: true,
    fileType: file.type,
  });
}

export async function resizeImage(
  file: File,
  target: { width?: number; height?: number; percent?: number },
): Promise<File> {
  const img = await loadImage(file);
  let w = img.naturalWidth;
  let h = img.naturalHeight;

  if (target.percent) {
    w = Math.round(w * (target.percent / 100));
    h = Math.round(h * (target.percent / 100));
  } else {
    if (target.width && target.height) {
      w = target.width;
      h = target.height;
    } else if (target.width) {
      h = Math.round((img.naturalHeight / img.naturalWidth) * target.width);
      w = target.width;
    } else if (target.height) {
      w = Math.round((img.naturalWidth / img.naturalHeight) * target.height);
      h = target.height;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, w, h);

  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = type === 'image/jpeg' ? 0.92 : undefined;
  const blob = await canvasToBlob(canvas, type, quality);
  if (!blob) throw new Error('Resize failed');
  return new File([blob], file.name, { type });
}

export async function convertImage(file: File, to: 'image/png' | 'image/jpeg'): Promise<File> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  if (to === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  const blob = await canvasToBlob(canvas, to, to === 'image/jpeg' ? 0.92 : undefined);
  if (!blob) throw new Error('Conversion failed');
  const ext = to === 'image/png' ? 'png' : 'jpg';
  const base = file.name.replace(/\.[^.]+$/, '');
  return new File([blob], `${base}.${ext}`, { type: to });
}

export function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const img = await loadImage(file);
  return { width: img.naturalWidth, height: img.naturalHeight };
}
