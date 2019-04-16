import { img } from '@/assets/images';
import {
  clickImage,
  tryClickImage,
  tryFindAnyImage,
  waitAndClickImage,
  waitAnyImage,
  waitImage
} from '@/utils/image';
import { wait } from '@/utils/wait';

export async function farmRareItem(): Promise<void> {
  const levelSelectPosition: Point | undefined = tryFindAnyImage(
    [
      img.levelSelectMaster,
      img.levelSelectExpert,
      img.levelSelectMaster,
      img.levelSelectStandard,
      img.levelSelectBeginner
    ],
    { id: 'level-select' }
  );
  if (!levelSelectPosition) {
    throw new Error('请至关卡选择页面再开始');
  }
  click(levelSelectPosition.x, levelSelectPosition.y);

  await waitImage(true, img.startBattleButton, {
    id: 'start-battle',
    timeout: 30e3,
    onDelay(): void {
      tryClickImage(img.supportSelectButton, { id: 'support-select' });
    },
    retry: true
  });
  await waitImage(true, img.loadingText, {
    id: 'level-1-loading',
    timeout: 30e3,
    onDelay(): void {
      tryClickImage(img.startBattleButton, { id: 'start-battle' });
    },
    retry: true
  });
  toastLog('检测到正在进入第一关卡');
  await waitImage(false, img.loadingText, {
    id: 'level-1-loading',
    retry: true
  });
  toastLog('检测到已进入第一关卡');
  tryClickImage(img.autoBattleSwitchOff, { id: 'auto-battle-switch-off' });

  await waitImage(true, img.loadingText, { id: 'level-2-loading' });
  toastLog('检测到正在进入第二关卡');
  await waitAnyImage(true, [img.rareItem1, img.rareItem2], {
    timeout: 60e3,
    onDelay(): void {
      tryClickImage(img.menuButton, { id: 'menu-button' });
    },
    id: 'rare-item',
    retry: true
  });
  await wait(500); // Wait menu animation finish;
  if (
    tryFindAnyImage(
      [img.noRareItem1, img.noRareItem2, img.noRareItem3, img.noRareItem4],
      {
        threshold: 0.99,
        id: 'no-rare-time'
      }
    )
  ) {
    toastLog('没有刷到稀有物品, 直接下一轮');
    clickImage(img.giveUpButtonBlue, { id: 'give-up-button-1' });
    await waitAndClickImage(img.giveUpButtonBlue, {
      timeout: 5e3,
      id: 'give-up-button-2'
    });
  } else {
    toastLog('成功刷到稀有物品, 继续完成战斗');
    while (
      !tryClickImage(img.continueButtonBlue, {
        id: 'finish-phrase-continue-button'
      })
    ) {
      tryClickImage(img.okButton, { id: 'finish-phrase-ok-button' });
      tryClickImage(img.closeButton, {
        id: 'finish-phrase-close-button'
      });
      tryClickImage(img.cancelButton, { id: 'finish-phrase-cancel-button' });
      tryClickImage(img.tapButton, { id: 'finish-phrase-tap-button' });
      tryClickImage(img.nextText, { id: 'finish-phrase-next-text' });
    }
  }
  await waitImage(true, img.levelSelect, {
    timeout: 60e3,
    id: 'level-select',
    retry: true
  });
}
