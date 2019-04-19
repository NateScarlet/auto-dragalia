import { img } from '@/assets/images';
import { handleRetry, tryFindAnyImage } from '@/utils/image';
import { wait } from '@/utils/wait';

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
  const { timeout = 600e3 } = options || {};
  const waitingEndTime: number = Date.now() + timeout;
  let ret: Point | undefined;
  waitingCount += 1;

  for (
    let isFinished: boolean = false;
    !isFinished;
    isFinished = Boolean(ret) === appear
  ) {
    ret = await handleAnyImageWaiting(appear, images, options, waitingEndTime);
  }

  return ret;
}

async function handleAnyImageWaiting(
  appear: boolean,
  images: Image[],
  options: IWaitImageOptions | undefined,
  waitingEndTime: number
): Promise<Point | undefined> {
  const {
    delay = 500,
    findOptions = {},
    onDelay = (): void | Promise<void> => undefined,
    id = String(waitingCount)
  } = options || {};

  if (Date.now() > waitingEndTime) {
    throw new Error('等待超时');
  }

  const roundStartTime: number = Date.now();
  const ret: Point | undefined = tryFindAnyImage(images, {
    ...findOptions,
    id
  });

  if (Boolean(ret) === appear) {
    return ret;
  }

  console.verbose(`Waiting image ${appear ? 'appear' : 'disappear'}: ${id}`);
  await onDelay();
  await wait(delay - (Date.now() - roundStartTime));

  return ret;
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

export async function waitLoading(options?: IWaitImageOptions): Promise<void> {
  await waitImage(false, img.loadingText, {
    ...options,
    async onDelay(): Promise<void> {
      handleRetry();
      if (options && options.onDelay) {
        await options.onDelay();
      }
    }
  });
}

export interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
  id?: string;
  onDelay?(): void | Promise<void>;
}
