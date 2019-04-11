import {
  cancelButton,
  closeButton,
  presentButton,
  presentPrice0,
  presentPrice1500,
  presentPrice15000,
  presentPrice4000,
  presentPrice8000
} from '@/images';
import {
  clickImage,
  findImage,
  keepClickAnyImage,
  tryFindImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

const allPresentPriceImages: Image[] = [
  presentPrice0,
  presentPrice1500,
  presentPrice4000,
  presentPrice8000,
  presentPrice15000
];

export async function feedDragon(): Promise<void> {
  try {
    clickImage(presentButton);
  } catch {
    throw new Error('未找到礼物按钮, 请手动前往龙之庭院');
  }

  await wait(500);
  for (const i of allPresentPriceImages) {
    try {
      const pos: Point = findImage(i);
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      break;
    }
  }

  if (
    !(await keepClickAnyImage([closeButton, cancelButton], {
      findOptions: {
        id: 'close-button'
      },
      onDelay(): boolean {
        return !tryFindImage(presentButton, {
          id: 'present-button'
        });
      }
    }))
  ) {
    throw new Error('无可用礼物');
  }
}
