import {
  autoBattleSwitchOff,
  cancelButton,
  closeButton,
  continueButtonBlue,
  giveUpButtonBlue,
  levelSelect,
  levelSelectBeginner,
  levelSelectExpert,
  levelSelectMaster,
  levelSelectStandard,
  loadingText,
  menuButton,
  nextText,
  noRareItem1,
  noRareItem2,
  noRareItem3,
  okButton,
  rareItem1,
  rareItem2,
  startBattleButton,
  supportSelectButton,
  tapButton
} from '@/images';
import {
  clickImage,
  tryClickImage,
  tryFindAnyImage,
  tryFindImageInScreen,
  waitAndClickImage,
  waitAnyImage,
  waitImage,
  waitLoading
} from '@/utils/image';

export async function farmRareItem(): Promise<void> {
  const levelSelectPosition: Point | undefined = tryFindAnyImage(
    [
      levelSelectMaster,
      levelSelectExpert,
      levelSelectMaster,
      levelSelectStandard
    ],
    { id: 'level-select' }
  );
  if (!levelSelectPosition) {
    throw new Error('请至关卡选择页面再开始');
  }
  click(levelSelectPosition.x, levelSelectPosition.y);

  await waitAndClickImage(supportSelectButton, {
    timeout: 5e3,
    id: 'support-select'
  });
  await waitAndClickImage(startBattleButton, {
    timeout: 5e3,
    id: 'start-battle'
  });
  await waitImage(loadingText, { timeout: 5e3, id: 'level-1-loading' });
  toastLog('检测到正在进入第一关卡');
  await waitLoading();
  toastLog('检测到已进入第一关卡');
  tryClickImage(autoBattleSwitchOff, { id: 'auto-battle-switch-off' });

  await waitImage(loadingText, { id: 'level-2-loading' });
  toastLog('检测到正在进入第二关卡');
  await waitAnyImage([rareItem1, rareItem2], {
    timeout: 60e3,
    onDelay(): void {
      tryClickImage(menuButton, { id: 'menu-button' });
    },
    id: 'rare-item'
  });
  if (
    tryFindAnyImage([noRareItem1, noRareItem2, noRareItem3], {
      threshold: 0.99,
      id: 'no-rare-time'
    })
  ) {
    toastLog('没有刷到稀有物品, 直接下一轮');
    clickImage(giveUpButtonBlue, { id: 'give-up-button-1' });
    await waitAndClickImage(giveUpButtonBlue, {
      timeout: 5e3,
      id: 'give-up-button-2'
    });
  } else {
    toastLog('成功刷到稀有物品, 继续完成战斗');
    while (
      !tryClickImage(continueButtonBlue, {
        id: 'finish-phrase-continue-button'
      })
    ) {
      tryClickImage(okButton, { id: 'finish-phrase-ok-button' });
      tryClickImage(closeButton, { id: 'finish-phrase-close-button' });
      tryClickImage(cancelButton, { id: 'finish-phrase-cancel-button' });
      tryClickImage(tapButton, { id: 'finish-phrase-tap-button' });
      tryClickImage(nextText, { id: 'finish-phrase-next-text' });
    }
  }
  await waitImage(levelSelect, { timeout: 60e3, id: 'level-select' });
}
