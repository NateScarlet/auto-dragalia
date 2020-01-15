import { tr } from '@/i18n';

images.requestScreenCapture(false);

export function findImage(image: Image, options?: IFindImageOptions): Point {
  const { id = '<id-not-set>' } = options || {};
  const ret: Point | null = images.findImage(
    images.captureScreen(),
    image,
    options
  );
  if (ret === null) {
    throw new Error(tr('image-not-found', { id }));
  }
  console.verbose(tr('image-found', { id, pos: ret }));

  return ret;
}

export function tryFindImage(
  ...args: Parameters<typeof findImage>
): Point | undefined {
  try {
    return findImage(...args);
  } catch {
    return;
  }
}

export function tryFindAnyImage(
  images: Image[],
  options?: IFindImageOptions
): Point | undefined {
  for (const i of images) {
    const pos: Point | undefined = tryFindImage(i, options);
    if (pos) {
      return pos;
    }
  }
}

export interface IFindImageOptions extends images.FindImageOptions {
  id?: string;
}
