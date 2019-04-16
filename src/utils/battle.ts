import { img } from '@/assets/images';
import { findImage, waitImage } from '@/utils/image';
import { wait } from '@/utils/wait';

export async function waitForEnemy(): Promise<void> {
  await waitImage(true, img.enemyLegend, {
    timeout: 3e3,
    findOptions: {
      region: [device.width / 4, 0, (device.width / 4) * 3, device.height / 2],
      threshold: 0.8
    }
  });
}

export async function transform2dragon(): Promise<void> {
  const pos: Point = findImage(img.transformGaugeFull);
  await waitForEnemy();
  console.log('龙化');
  click(pos.x + 100, pos.y);
  await wait(2500);
  await waitForEnemy();
  console.log('使用龙技能');
  click(pos.x + 360, pos.y + 300);
}

export async function tryTransform2dragon(): Promise<void> {
  try {
    await transform2dragon();
  } catch {
    return;
  }
}

export async function castSupportSkill(): Promise<void> {
  const pos: Point | undefined = findImage(img.supportSkillAvailable, {
    region: [device.width / 3, device.height / 4]
  });
  if (!pos) {
    console.verbose(`支援技能不可用`);

    return;
  }
  await waitForEnemy();
  console.log(`使用支援技能: ${pos}`);
  click(pos.x, pos.y - 80);
}

export async function tryCastSupportSkill(): Promise<void> {
  try {
    await castSupportSkill();
  } catch {
    return;
  }
}
