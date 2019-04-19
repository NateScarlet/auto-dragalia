import { assets, img } from '@/assets/images';
import { wait } from '@/utils/wait';
import lodashSortby from 'lodash.sortby';
images.requestScreenCapture(false);

export function loadAssets(name: string): void {
  toastLog(`Load assets: ${name}`);
  Object.assign(images, assets[name]);
}

export function getAssetByResolution(
  width: number = device.width,
  height: number = device.height
): string {
  const pattern: RegExp = /(\d+)x(\d+)/;
  interface IResolution {
    name: string;
    width: number;
    height: number;
  }
  const resolutions: IResolution[] = Object.keys(assets)
    .map((i: string) => i.match(pattern))
    .filter((i: RegExpMatchArray | null) => i)
    .map(
      (i: RegExpMatchArray | null): IResolution => {
        if (!i) {
          throw new Error('Unexpected');
        }

        return {
          name: i[0],
          width: Number.parseInt(i[1], 10),
          height: Number.parseInt(i[2], 10)
        };
      }
    );

  return lodashSortby(resolutions, (i: IResolution) => [
    Math.abs(i.height / i.width - height / width),
    Math.abs(i.height - height) + Math.abs(i.width - width)
  ])[0].name;
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
  while (Date.now() - startTime.getTime() < timeout) {
    const ret: Point | undefined = tryFindAnyImage(images, {
      ...findOptions,
      id
    });
    if (Boolean(ret) === appear) {
      return ret;
    }
    await waitRound();
  }
  throw new Error('等待超时');

  async function waitRound(): Promise<void> {
    console.verbose(`Waiting image ${appear ? 'appear' : 'disappear'}: ${id}`);
    await onDelay();
    if (retry) {
      handleRetry();
    }
    await wait(delay - (Date.now() - roundStartTime.getTime()));
    roundStartTime = new Date();
  }
}

function handleRetry(): void {
  tryClickImage(img.retryButtonRed, { id: 'retry-button-red' });
  tryClickImage(img.retryButtonBlue, { id: 'retry-button-blue' });
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
    retry: right.retry,
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

interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
  id?: string;
  retry?: boolean;
  onDelay?(): void | Promise<void>;
}
interface IImageClickChainItem
  extends IWaitImageOptions,
    images.FindImageOptions {
  image: Image;
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
