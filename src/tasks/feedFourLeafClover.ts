import {
  cancelButton,
  closeButton,
  cloverButton,
  cloverPage,
  lv29Button,
  presentButton
} from '@/images';
import {
  clickImage,
  findImageInScreen,
  keepClickAnyImage,
  tryClickImage,
  tryFindImageInScreen
} from '@/utils/image';
import { wait } from '@/utils/wait';

export async function feedFourLeafClover(): Promise<void> {
  try {
    clickImage(presentButton, { id: 'present-button' });
  } catch {
    throw new Error('未找到礼物按钮, 请手动前往龙之庭院');
  }

  if (
    tryFindImageInScreen(lv29Button, {
      threshold: 0.95,
      id: 'lv29-button'
    })
  ) {
    throw new Error('信赖度已达到29级，若继续，请手动喂食');
  } else {
    await wait(500);
    tryClickImage(cloverPage, { id: 'clover-page' });

    await wait(500);
    try {
      const pos: Point = findImageInScreen(cloverButton, {
        id: 'clover-button'
      });
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      throw new Error('没有四叶草，请去炼草');
    }

    if (
      !(await keepClickAnyImage([closeButton, cancelButton], {
        findOptions: {
          id: 'close-button'
        },
        onDelay(): boolean {
          return !tryFindImageInScreen(presentButton, {
            id: 'present-button'
          });
        }
      }))
    ) {
      throw new Error('无可用礼物或等待超时');
    }
  }
}
