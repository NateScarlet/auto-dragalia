import { loadingText, retryButtonBlue, retryButtonRed } from '@/images';
import { wait } from '@/utils/wait';

images.requestScreenCapture(false);
const screenCache: {
  image: Image;
  updated: Date;
} = {
  image: images.captureScreen(),
  updated: new Date()
};
export function captureScreenWithCache(maxAge: number = 500): Image {
  const now: Date = new Date();
  if (now.getTime() - screenCache.updated.getTime() > maxAge) {
    screenCache.image = images.captureScreen();
    screenCache.updated = now;
  }

  return screenCache.image;
}

export function tryFindAnyImage(
  images: Image[],
  options?: IFindImageOptions
): Point | undefined {
  for (const i of images) {
    const pos: Point | undefined = tryFindImageInScreen(i, options);
    if (pos) {
      return pos;
    }
  }
}

export function tryFindImageInScreen(
  ...args: Parameters<typeof findImageInScreen>
): Point | undefined {
  try {
    return findImageInScreen(...args);
  } catch {
    return;
  }
}

export function findImageInScreen(
  image: Image,
  options?: IFindImageOptions
): Point {
  const { id = '<id-not-set>' } = options || {};
  const ret: Point | null = images.findImage(
    captureScreenWithCache(),
    image,
    options
  );
  if (ret === null) {
    throw new Error(`未找到图像: ${id}`);
  }
  console.verbose(`Found image: ${id}: ${ret}`);

  return ret;
}

export function clickImage(image: Image, options?: IFindImageOptions): Point {
  const pos: Point = findImageInScreen(image, options);
  click(pos.x, pos.y);

  return pos;
}

export function tryClickImage(
  image: Image,
  options?: IFindImageOptions
): Point | undefined {
  try {
    return clickImage(image, options);
  } catch (err) {
    return;
  }
}

export async function waitAndClickImage(
  image: Image,
  options?: IWaitImageOptions
): Promise<Point> {
  const pos: Point = await waitImage(true, image, options);
  click(pos.x, pos.y);

  return pos;
}

export async function waitImage(
  appear: true,
  image: Image,
  options?: IWaitImageOptions
): Promise<Point>;
export async function waitImage(
  appear: false,
  image: Image,
  options?: IWaitImageOptions
): Promise<void>;
export async function waitImage(
  appear: boolean,
  image: Image,
  options?: IWaitImageOptions
): Promise<Point | void> {
  if (appear) {
    return waitAnyImage(appear, [image], options);
  }

  return waitAnyImage(appear, [image], options);
}

let waitingCount: number = 0;

export async function waitAnyImage(
  appear: true,
  images: Image[],
  options?: IWaitImageOptions
): Promise<Point>;
export async function waitAnyImage(
  appear: false,
  images: Image[],
  options?: IWaitImageOptions
): Promise<void>;
export async function waitAnyImage(
  appear: boolean,
  images: Image[],
  options?: IWaitImageOptions
): Promise<Point | void> {
  waitingCount += 1;
  const {
    timeout = 600e3,
    delay = 500,
    findOptions = {},
    onDelay = (): void | Promise<void> => undefined,
    id = String(waitingCount)
  } = options || {};

  await wait(delay);
  const startTime: Date = new Date();
  let roundStartTime: Date = startTime;
  while (new Date().getTime() - startTime.getTime() < timeout) {
    const ret: Point | undefined = tryFindAnyImage(images, {
      ...findOptions,
      id
    });
    if (Boolean(ret) === appear) {
      return ret;
    }
    console.verbose(`Waiting image ${appear ? 'appear' : 'disappear'}: ${id}`);
    await onDelay();
    tryClickImage(retryButtonRed, { id: 'retry-button-red' });
    tryClickImage(retryButtonBlue, { id: 'retry-button-blue' });
    const now: Date = new Date();
    await wait(delay - (now.getTime() - roundStartTime.getTime()));
    roundStartTime = now;
  }
  throw new Error('等待超时');
}

interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
  id?: string;
  onDelay?(): void | Promise<void>;
}

interface IFindImageOptions extends images.FindImageOptions {
  id?: string;
}
