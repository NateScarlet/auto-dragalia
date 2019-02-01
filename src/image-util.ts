export function findImageInScreen(image: Image): Point {
  return images.findImage(images.captureScreen(), image);
}

export function clickImage(image: Image): void {
  const pos = findImageInScreen(image);
  if (pos === null) {
    throw new Error(`未找到图像`);
  }
  console.verbose(`Find image at: ${pos}`);
  click(pos.x, pos.y);
}

export function tryClickImage(image: Image): void {
  try {
    clickImage(image);
  } catch {}
}
