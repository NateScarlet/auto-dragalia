import {
  closeButton,
  presentButton,
  cloverPage,
  cloverButton,
  lv29Button
} from '@/images';
import {
  clickImage,
  findImageInScreen,
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

  if (tryFindImageInScreen(lv29Button, {
      threshold: 0.95,
      id: 'lv29-button'
    })) {
    throw new Error('信赖度已达到29级，若继续，请手动喂食');
  } else {
    await wait(500);
    tryClickImage(cloverPage, { id: 'clover-page' });

    await wait(500);
    try {
      const pos: Point = findImageInScreen(cloverButton, { id: 'clover-button' });
      swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
    } catch {
      throw new Error('没有四叶草，请去炼草');
    }

    let waitEndTime: number = new Date().getTime() + 20e3;
    let isCloseClicked: boolean = false;
    while (new Date().getTime() <= waitEndTime) {
      if (tryClickImage(closeButton, { id: 'close-button' })) {
        isCloseClicked = true;
        waitEndTime = new Date().getTime() + 5e3;
        await wait(500);
      } else {
        if (tryFindImageInScreen(presentButton, { 
          id: 'present-button' })) {
          break;
        }
        await wait(1000);
      }
    }

    if (!isCloseClicked) {
      throw new Error('无可用礼物或等待超时');
    }
  }

}
