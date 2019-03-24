import {
  enemyLegend,
  supportSkillAvailable,
  transformGaugeFull
} from '@/images';
import { findImageInScreen } from '@/imageUtil';

export function hasEnemy(): boolean {
  try {
    images.findImageInRegion(
      images.captureScreen(),
      enemyLegend,
      device.width / 4,
      0,
      (device.width / 4) * 3,
      device.height / 2,
      0.8
    );

    return true;
  } catch {
    toast('周围无敌人');

    return false;
  }
}
export function waitForEnemy(max: number = 3): void {
  let count: number = 0;
  while (!hasEnemy()) {
    sleep(1000);
    count += 1;
    if (count > max) {
      throw new Error('Wait too long');
    }
  }
}
export function transform2dragon(): void {
  const pos: Point = findImageInScreen(transformGaugeFull);
  waitForEnemy();
  toast('龙化');
  click(pos.x + 100, pos.y);
  sleep(3000);
  waitForEnemy();
  toast('使用龙技能');
  click(pos.x + 360, pos.y + 300);
}

export function tryTransform2dragon(): void {
  if (!hasEnemy()) {
    return;
  }
  try {
    transform2dragon();
  } catch {
    console.verbose('Can not transform to dragon');
  }
}

export function castSupportSkill(): void {
  const pos: Point = images.findImageInRegion(
    images.captureScreen(),
    supportSkillAvailable,
    device.width / 3,
    device.height / 4
  );
  if (pos === null) {
    console.verbose(`支援技能不可用`);

    return;
  }
  waitForEnemy();
  toast('使用支援技能');
  console.verbose(`支援技能位置: ${pos}`);
  click(pos.x, pos.y - 80);
}

export function tryCastSupportSkill(): void {
  if (!hasEnemy()) {
    return;
  }
  try {
    castSupportSkill();
  } catch {
    console.verbose('Can not cast support skill');
  }
}
