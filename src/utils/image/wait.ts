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
  waitingCount += 1;
  const {
    timeout = 600e3,
    delay = 500,
    findOptions = {},
    onDelay = (): void | Promise<void> => undefined,
    id = String(waitingCount)
  } = options || {};

  await wait(delay);
  const waitingEndTime: Date = new Date(Date.now() + timeout);
  let ret: Point | undefined;
  while (Boolean(ret) !== appear) {
    await waitRound();
  }

  return ret;

  async function waitRound(): Promise<void> {
    const roundStartTime: Date = new Date();
    if (roundStartTime.getTime() > waitingEndTime.getTime()) {
      throw new Error('等待超时');
    }

    ret = tryFindAnyImage(images, { ...findOptions, id });
    if (Boolean(ret) === appear) {
      return;
    }
    console.verbose(`Waiting image ${appear ? 'appear' : 'disappear'}: ${id}`);
    await onDelay();
    await wait(delay - (Date.now() - roundStartTime.getTime()));
  }
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

export interface IWaitImageOptions {
  timeout?: number;
  delay?: number;
  findOptions?: images.FindImageOptions;
  id?: string;
  onDelay?(): void | Promise<void>;
}
