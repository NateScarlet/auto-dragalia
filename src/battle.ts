import { findImageInScreen } from '@/image-util';
import { transformGageFull } from '@/images';

export function transform2dragon(): void {
  const pos = findImageInScreen(transformGageFull);
  toast('龙化');
  click(pos.x + 100, pos.y);
  sleep(3000);
  toast('使用龙技能');
  click(pos.x + 360, pos.y + 300);
}

export function tryTransform2dragon(): void {
  try {
    transform2dragon();
  } catch {}
}
