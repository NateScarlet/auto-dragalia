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
  console.verbose(`Find image at: ${ret}`);

  return ret;
}

export function clickImage(
  image: Image,
  options?: images.FindImageOptions
): void {
  const pos: Point = findImageInScreen(image, options);
  click(pos.x, pos.y);
}

export function tryClickImage(image: Image): void {
  try {
    clickImage(image);
  } catch (err) {
    console.verbose(err);
  }
}
