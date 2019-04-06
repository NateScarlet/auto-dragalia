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
  const levelSelectPosition: Point | undefined =
    tryFindImageInScreen(levelSelectMaster) ||
    tryFindImageInScreen(levelSelectExpert) ||
    tryFindImageInScreen(levelSelectStandard) ||
    tryFindImageInScreen(levelSelectBeginner);
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
  tryClickImage(autoBattleSwitchOff);

  await waitImage(loadingText, { id: 'level-2-loading' });
  toastLog('检测到正在进入第二关卡');
  await waitAnyImage([rareItem1, rareItem2], {
    timeout: 60e3,
    onDelay(): void {
      tryClickImage(menuButton);
    },
    id: 'rare-item'
  });
  if (
    tryFindAnyImage([noRareItem1, noRareItem2, noRareItem3], {
      threshold: 0.99
    })
  ) {
    toastLog('没有刷到稀有物品, 直接下一轮');
    clickImage(giveUpButtonBlue);
    await waitAndClickImage(giveUpButtonBlue, { timeout: 5e3 });
  } else {
    toastLog('成功刷到稀有物品, 继续完成战斗');
    while (!tryClickImage(continueButtonBlue)) {
      tryClickImage(okButton);
      tryClickImage(closeButton);
      tryClickImage(cancelButton);
      tryClickImage(tapButton);
      tryClickImage(nextText);
    }
  }
  await waitImage(levelSelect, { timeout: 60e3, id: 'level-select' });
}
