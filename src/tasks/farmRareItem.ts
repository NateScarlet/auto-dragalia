import { img } from '@/assets/images';
import {
  chainImageClicks,
  clickImage,
  handleRetry,
  tryClickImage,
  tryFindAnyImage,
  waitAndClickImage,
  waitAnyImage,
  waitImage,
  waitLoading
} from '@/utils/image';
import { wait } from '@/utils/wait';

export async function farmRareItem(): Promise<void> {
  selectLevel();
  await enterStage1();
  toastLog('检测到正在进入第一关卡');
  await waitLoading({ id: 'stage-1-loading' });
  toastLog('检测到已进入第一关卡');
  await enterStage2();
  toastLog('检测到正在进入第二关卡');
  await enterMenu();
  await checkRareItem();
  await waitImage(true, img.levelSelect, {
    timeout: 60e3,
    id: 'level-select',
    onDelay: handleRetry
  });
}

function selectLevel(): void {
  const levelSelectPosition: Point | undefined = tryFindAnyImage(
    [
      img.levelSelectMaster,
      img.levelSelectExpert,
      img.levelSelectMaster,
      img.levelSelectStandard,
      img.levelSelectBeginner
    ],
    {
      id: 'level-select'
    }
  );
  if (!levelSelectPosition) {
    throw new Error('请至关卡选择页面再开始');
  }
  click(levelSelectPosition.x, levelSelectPosition.y);
}

async function enterStage1(): Promise<void> {
  await chainImageClicks(
    {
      image: img.supportSelectButton,
      timeout: 30e3,
      id: 'support-select',
      onDelay: handleRetry
    },
    {
      image: img.startBattleButton,
      id: 'start-battle',
      timeout: 30e3,
      onDelay: handleRetry
    },
    {
      image: img.loadingText,
      id: 'stage-1-loading',
      timeout: 30e3,
      onDelay: handleRetry
    }
  );
}

async function enterStage2(): Promise<void> {
  tryClickImage(img.autoBattleSwitchOff, { id: 'auto-battle-switch-off' });
  await waitImage(true, img.loadingText, { id: 'stage-2-loading' });
}

async function enterMenu(): Promise<void> {
  await waitAnyImage(true, [img.rareItem], {
    timeout: 60e3,
    onDelay(): void {
      handleRetry();
      tryClickImage(img.menuButton, {
        id: 'menu-button'
      });
    },
    id: 'rare-item'
  });
  await wait(500); // Wait menu animation finish;
}

async function checkRareItem(): Promise<void> {
  if (
    tryFindAnyImage([img.noRareItem1, img.noRareItem2], {
      threshold: 0.99,
      id: 'no-rare-time'
    })
  ) {
    await onFail();
  } else {
    onSuccess();
  }
}

function onSuccess(): void {
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

async function onFail(): Promise<void> {
  toastLog('没有刷到稀有物品, 直接下一轮');
  clickImage(img.giveUpButtonBlue, { id: 'give-up-button-1' });
  await waitAndClickImage(img.giveUpButtonBlue, {
    timeout: 5e3,
    id: 'give-up-button-2'
  });
}
