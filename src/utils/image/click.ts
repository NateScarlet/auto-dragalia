import { img } from '@/assets/images';
import {
  findImage,
  IFindImageOptions,
  IWaitImageOptions,
  tryFindAnyImage,
  waitImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

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

export function handleRetry(): void {
  tryClickImage(img.retryButtonRed, { id: 'retry-button-red' });
  tryClickImage(img.retryButtonBlue, { id: 'retry-button-blue' });
}
interface IKeepClickAnyImageContext {
  waitEndTime: number;
  clickCount: number;
  isFinished: boolean;
  images: Image[];
  options: IKeepClickImageOptions;
}

export async function keepClickAnyImage(
  images: Image[],
  options?: IKeepClickImageOptions
): Promise<number> {
  const { firstTimeout = 20e3 }: IKeepClickImageOptions = options || {};
  const context: IKeepClickAnyImageContext = {
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

async function handleKeepAnyImageClicking(
  context: IKeepClickAnyImageContext
): Promise<void> {
  if (Date.now() > context.waitEndTime) {
    context.isFinished = true;

    return;
  }

  const {
    nextTimeout = 5e3,
    findOptions,
    onDelay = (): boolean => true
  }: IKeepClickImageOptions = context.options;

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

async function chainImageClick(
  left: IImageClickChainItem,
  right: IImageClickChainItem
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
  ...items: IImageClickChainItem[]
): Promise<Point[]> {
  const ret: Point[] = [];
  for (let pos: number = 0; pos + 1 < items.length; pos += 1) {
    ret.push(await chainImageClick(items[pos], items[pos + 1]));
  }
  if (ret === undefined) {
    throw new Error('Need at least 2 image to chain click');
  }

  return ret;
}

export interface IImageClickChainItem
  extends IWaitImageOptions,
    images.FindImageOptions {
  image: Image;
}

export interface IKeepClickImageOptions {
  firstTimeout?: number;
  nextTimeout?: number;
  findOptions?: IFindImageOptions;
  onDelay?(): boolean | Promise<boolean>;
}
