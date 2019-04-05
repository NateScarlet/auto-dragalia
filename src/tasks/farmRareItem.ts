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
  noRareItem,
  okButton,
  rareItem,
  startBattleButton,
  supportSelectButton,
  tapButton
} from '@/images';
import {
  tryClickImage,
  tryFindImageInScreen,
  waitAndClickImage,
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

  await waitAndClickImage(supportSelectButton);
  await waitAndClickImage(startBattleButton);
  await waitImage(loadingText);
  toastLog('检测到正在进入第一关卡');
  await waitLoading();
  toastLog('检测到已进入第一关卡');
  tryClickImage(autoBattleSwitchOff);

  await waitImage(loadingText);
  toastLog('检测到正在进入第二关卡');
  await waitAndClickImage(menuButton, { timeout: 60e3 });
  await waitImage(rareItem);
  if (tryFindImageInScreen(noRareItem, { threshold: 0.99 })) {
    toastLog('没有刷到稀有物品, 直接下一轮');
    await waitAndClickImage(giveUpButtonBlue);
    await waitAndClickImage(giveUpButtonBlue);
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
  await waitImage(levelSelect);
}
