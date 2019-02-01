import { transformGageFull } from '@/images';

export function findImageInScreen(image: Image): Point {
  const ret = images.findImage(images.captureScreen(), image);
  if (ret === null) {
    throw new Error(`未找到图像`);
  }
  console.verbose(`Find image at: ${ret}`);
  return ret;
}

export function clickImage(image: Image): void {
  const pos = findImageInScreen(image);
  click(pos.x, pos.y);
}

export function tryClickImage(image: Image): void {
  try {
    clickImage(image);
  } catch {}
}

export function clickTransformationButton(): void {
  const pos = findImageInScreen(transformGageFull);
  toast('龙化');
  click(pos.x + 100, pos.y);
  sleep(3000);
  toast('使用龙技能');
  click(pos.x + 360, pos.y + 300);
}

export function tryClickTransformationButton(): void {
  try {
    clickTransformationButton();
  } catch {}
}
