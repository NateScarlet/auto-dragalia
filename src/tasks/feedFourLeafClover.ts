import { img } from '@/assets/images';
import { enterPresentPage } from '@/tasks/feedDragon';
import {
  findImage,
  keepClickAnyImage,
  tryClickImage,
  tryFindImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

export async function feedFourLeafClover(): Promise<void> {
  await enterPresentPage();

  if (
    tryFindImage(img.lv29Button, {
      threshold: 0.95,
      id: 'lv29-button'
    })
  ) {
    throw new Error('信赖度已达到29级，若继续，请手动喂食');
  } else {
    await wait(500);
    tryClickImage(img.cloverPage, { id: 'clover-page' });

    await wait(500);
    try {
      const pos: Point = findImage(img.cloverButton, {
        id: 'clover-button'
      });
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      throw new Error('没有四叶草，请去炼草');
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
      throw new Error('无可用礼物或等待超时');
    }
  }
}
