import {
  closeButton,
  presentButton,
  presentPrice0,
  presentPrice1500,
  presentPrice15000,
  presentPrice4000,
  presentPrice8000
} from '@/images';
import { clickImage, findImageInScreen } from '@/imageUtil';
import { store } from '@/store';

const allPresentPriceImages: Image[] = [
  presentPrice0,
  presentPrice1500,
  presentPrice4000,
  presentPrice8000,
  presentPrice15000
];
export function feedDragon(): void {
  try {
    clickImage(presentButton);
  } catch {
    toast('未找到礼物按钮, 请手动前往龙之庭院');
    sleep(2000);
    store.currentTask = undefined;

    return;
  }
  sleep(500);
  for (const i of allPresentPriceImages) {
    try {
      const pos: Point = findImageInScreen(i);
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
      sleep(500);
    } catch {
      break;
    }
  }
  const startTime: number = new Date().getTime();
  const waitWindow: number = 1e4;
  while (new Date().getTime() - startTime <= waitWindow) {
    try {
      clickImage(closeButton);

      return;
    } catch {
      sleep(1000);
    }
  }
  if (new Date().getTime() - startTime > waitWindow) {
    throw new Error('无可用礼物');
  }
}
