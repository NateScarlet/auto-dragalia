import { loadingText, retryButtonBlue, retryButtonRed } from '@/images';
import { wait } from '@/utils/wait';

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
export async function waitAndClickImage(
  ...args: Parameters<typeof waitImage>
): Promise<Point> {
  const pos: Point = await waitImage(...args);
  click(pos.x, pos.y);

  return pos;
}

export async function waitImage(
  image: Image,
  options?: IWaitImageOptions
): Promise<Point> {
  const { timeout = 600e3, delay = 500, findOptions = {} } = options || {};
  await wait(delay);
  const startTime: Date = new Date();
  while (new Date().getTime() - startTime.getTime() < timeout) {
    try {
      return findImageInScreen(image, findOptions);
    } catch {
      console.verbose('Waiting image');
      await wait(delay);
    }
  }
  throw new Error('等待超时');
}

export async function waitLoading(delay: number = 500): Promise<void> {
  while (tryFindImageInScreen(loadingText)) {
    tryClickImage(retryButtonRed);
    tryClickImage(retryButtonBlue);
    await wait(delay);
  }
}

interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
}
