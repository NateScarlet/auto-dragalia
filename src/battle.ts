import { findImageInScreen } from '@/image-util';
import { enemyLegend, transformGaugeFull } from '@/images';

export function hasEnemy(): boolean {
  try {
    findImageInScreen(enemyLegend, { threshold: 0.7 });
    return true;
  } catch {
    toast('周围无敌人');
    return false;
  }
}
export function waitForEnemy(max: number = 3): void {
  let count = 0;
  while (!hasEnemy()) {
    sleep(1000);
    count += 1;
    if (count > max) {
      throw new Error('Wait too long');
    }
  }
}
export function transform2dragon(): void {
  const pos = findImageInScreen(transformGaugeFull);
  waitForEnemy();
  toast('龙化');
  click(pos.x + 100, pos.y);
  sleep(3000);
  waitForEnemy();
  toast('使用龙技能');
  click(pos.x + 360, pos.y + 300);
}

export function tryTransform2dragon(): void {
  try {
    transform2dragon();
  } catch {}
}
