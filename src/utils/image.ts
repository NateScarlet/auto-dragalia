import { loadingText, retryButtonBlue, retryButtonRed } from '@/images';
import { wait } from '@/utils/wait';

images.requestScreenCapture(false);

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

export function tryFindImage(
  ...args: Parameters<typeof findImage>
): Point | undefined {
  try {
    return findImage(...args);
  } catch {
    return;
  }
}

export function findImage(image: Image, options?: IFindImageOptions): Point {
  const { id = '<id-not-set>' } = options || {};
  const ret: Point | null = images.findImage(
    images.captureScreen(),
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
  const pos: Point = findImage(image, options);
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

export function tryClickAnyImage(
  images: Image[],
  options?: IFindImageOptions
): Point | undefined {
  const pos: Point | undefined = tryFindAnyImage(images, options);
  if (!pos) {
    return;
  }

  click(pos.x, pos.y);

  return pos;
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
    id = String(waitingCount),
    retry = false
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
    if (retry) {
      tryClickImage(retryButtonRed, { id: 'retry-button-red' });
      tryClickImage(retryButtonBlue, { id: 'retry-button-blue' });
    }
    const now: Date = new Date();
    await wait(delay - (now.getTime() - roundStartTime.getTime()));
    roundStartTime = now;
  }
  throw new Error('等待超时');
}

export async function keepClickAnyImage(
  images: Image[],
  {
    firstTimeout = 20e3,
    nextTimeout = 5e3,
    findOptions,
    onDelay = (): boolean => true
  }: IKeepClickImageOptions = {}
): Promise<number> {
  let waitEndTime: number = Date.now() + firstTimeout;
  let clickCount: number = 0;
  while (Date.now() <= waitEndTime) {
    if (tryClickAnyImage(images, findOptions)) {
      clickCount += 1;
      waitEndTime = Date.now() + nextTimeout;
      await wait(500);
    } else {
      await wait(1000);
    }
    if (!(await onDelay())) {
      break;
    }
  }

  return clickCount;
}

interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
  id?: string;
  retry?: boolean;
  onDelay?(): void | Promise<void>;
}

interface IFindImageOptions extends images.FindImageOptions {
  id?: string;
}

interface IKeepClickImageOptions {
  firstTimeout?: number;
  nextTimeout?: number;
  findOptions?: IFindImageOptions;
  onDelay?(): boolean | Promise<boolean>;
}
