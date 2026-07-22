import type { ImageAspect } from '@i-career/types';

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const ASPECT_CLASSES: Record<ImageAspect, string> = {
  '16:6': 'aspect-[16/6]',
  '16:9': 'aspect-[16/9]',
  '1:1': 'aspect-square',
};

export function aspectRatioClass(aspect: ImageAspect): string {
  return ASPECT_CLASSES[aspect] ?? ASPECT_CLASSES['16:6'];
}
