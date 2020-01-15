import { img } from '@/assets/images';
import { enterPresentPage, handlePresentResponse } from '@/tasks/feedDragon';
import { findImage, tryClickImage, tryFindImage } from '@/utils/image';
import { wait } from '@/utils/wait';
import { tr } from '@/i18n';

export async function feedFourLeafClover(): Promise<void> {
  if (
    tryFindImage(img.lv29Button, {
      threshold: 0.95,
      id: 'lv29-button'
    })
  ) {
    throw new Error(tr('closeness-reach-lv29'));
  }

  await enterPresentPage();

  tryClickImage(img.cloverPage, { id: 'clover-page' });
  await wait(500);

  try {
    const pos: Point = findImage(img.cloverButton, {
      id: 'clover-button'
    });
    swipe(pos.x, pos.y, pos.x, pos.y - 300, 300);
  } catch {
    throw new Error(tr('no-clover'));
  }

  await handlePresentResponse();
}
