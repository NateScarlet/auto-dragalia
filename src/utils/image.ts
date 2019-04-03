import { loadingText } from '@/images';

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
  options?: images.FindImageOptions
): Point {
  const ret: Point | null = images.findImage(
    images.captureScreen(),
    image,
    options
  );
  if (ret === null) {
    throw new Error(`未找到图像`);
  }
  console.verbose(`Found image at: ${ret}`);

  return ret;
}

export function clickImage(
  image: Image,
  options?: images.FindImageOptions
): Point {
  const pos: Point = findImageInScreen(image, options);
  click(pos.x, pos.y);

  return pos;
}

export function tryClickImage(image: Image): Point | undefined {
  try {
    return clickImage(image);
  } catch (err) {
    return;
  }
}
export function waitAndClickImage(
  ...args: Parameters<typeof waitImage>
): Point {
  const pos: Point = waitImage(args[0]);
  click(pos.x, pos.y);

  return pos;
}

export function waitImage(image: Image, options?: IWaitImageOptions): Point {
  const { timeout = 600e3, delay = 500 } = options || {};
  sleep(delay);
  const startTime: Date = new Date();
  while (new Date().getTime() - startTime.getTime() < timeout) {
    try {
      return findImageInScreen(image);
    } catch {
      console.verbose('Waiting image');
      sleep(delay);
    }
  }
  throw new Error('等待超时');
}

export function waitLoading(delay: number = 500): void {
  while (tryFindImageInScreen(loadingText)) {
    sleep(delay);
  }
}

interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
}
