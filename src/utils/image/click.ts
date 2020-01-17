import { img } from '@/assets/images';
import {
  findImage,
  FindImageOptions,
  WaitImageOptions,
  tryFindAnyImage,
  waitImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

export function clickImage(image: Image, options?: FindImageOptions): Point {
  const pos: Point = findImage(image, options);
  click(pos.x, pos.y);

  return pos;
}

export function tryClickImage(
  image: Image,
  options?: FindImageOptions
): Point | undefined {
  try {
    return clickImage(image, options);
  } catch (err) {
    return;
  }
}

export function tryClickAnyImage(
  images: Image[],
  options?: FindImageOptions
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
  options?: WaitImageOptions
): Promise<Point> {
  const pos: Point = await waitImage(true, image, options);
  click(pos.x, pos.y);

  return pos;
}

export function handleRetry(): void {
  tryClickImage(img.retryButtonRed, { id: 'retry-button-red' });
  tryClickImage(img.retryButtonBlue, { id: 'retry-button-blue' });
}
interface KeepClickAnyImageContext {
  waitEndTime: number;
  clickCount: number;
  isFinished: boolean;
  images: Image[];
  options: KeepClickImageOptions;
}

async function handleKeepAnyImageClicking(
  context: KeepClickAnyImageContext
): Promise<void> {
  if (Date.now() > context.waitEndTime) {
    context.isFinished = true;

    return;
  }

  const {
    nextTimeout = 5e3,
    findOptions,
    onDelay = (): boolean => true
  }: KeepClickImageOptions = context.options;

  if (tryClickAnyImage(context.images, findOptions)) {
    context.clickCount += 1;
    context.waitEndTime = Date.now() + nextTimeout;
    await wait(500);
  } else {
    await wait(1000);
  }
  if (!(await onDelay())) {
    context.isFinished = true;
  }
}

export async function keepClickAnyImage(
  images: Image[],
  options?: KeepClickImageOptions
): Promise<number> {
  const { firstTimeout = 20e3 }: KeepClickImageOptions = options || {};
  const context: KeepClickAnyImageContext = {
    images,
    waitEndTime: Date.now() + firstTimeout,
    clickCount: 0,
    isFinished: false,
    options: options || {}
  };
  while (!context.isFinished) {
    await handleKeepAnyImageClicking(context);
  }

  return context.clickCount;
}

async function chainImageClick(
  left: ImageClickChainItem,
  right: ImageClickChainItem
): Promise<Point> {
  return waitImage(true, right.image, {
    id: right.id,
    delay: right.delay,
    findOptions: right.findOptions,
    async onDelay(): Promise<void> {
      if (right.onDelay) {
        await right.onDelay();
      }
      tryClickImage(left.image, {
        id: left.id,
        level: left.level,
        region: left.region,
        threshold: left.threshold
      });
    },
    timeout: right.timeout
  });
}

/**
 * Click multiple images one by one, last image waited but not clicked
 * @param items Options for each image to click
 * @return image positions in order
 */
export async function chainImageClicks(
  ...items: ImageClickChainItem[]
): Promise<Point[]> {
  if (items.length < 2) {
    throw new Error('Need at least 2 image to chain click');
  }
  const ret: Point[] = [];
  for (let pos = 0; pos + 1 < items.length; pos += 1) {
    ret.push(await chainImageClick(items[pos], items[pos + 1]));
  }

  return ret;
}

export interface ImageClickChainItem
  extends WaitImageOptions,
    images.FindImageOptions {
  image: Image;
}

export interface KeepClickImageOptions {
  firstTimeout?: number;
  nextTimeout?: number;
  findOptions?: FindImageOptions;
  onDelay?(): boolean | Promise<boolean>;
}
