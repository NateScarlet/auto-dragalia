import { img } from '@/assets/images';
import {
  clickImage,
  findImage,
  keepClickAnyImage,
  tryFindImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

const allPresentPriceImages: Image[] = [
  img.presentPrice0,
  img.presentPrice1500,
  img.presentPrice4000,
  img.presentPrice8000,
  img.presentPrice15000
];

export async function feedDragon(): Promise<void> {
  await enterPresentPage();

  for (const i of allPresentPriceImages) {
    try {
      const pos: Point = findImage(i, {
        id: 'present-price'
      });
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      break;
    }
  }

  if (
    !(await keepClickAnyImage([img.closeButton, img.cancelButton], {
      findOptions: {
        id: 'dialog-button'
      },
      onDelay(): boolean {
        return !tryFindImage(img.presentButton, {
          id: 'present-button'
        });
      }
    }))
  ) {
    throw new Error('无可用礼物');
  }
}

export async function enterPresentPage(): Promise<void> {
  try {
    clickImage(img.presentButton, {
      id: 'present-button'
    });
    await wait(500);
  } catch {
    throw new Error('未找到礼物按钮, 请手动前往龙之庭院');
  }
}
