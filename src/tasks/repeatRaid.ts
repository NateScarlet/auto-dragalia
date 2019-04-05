import { tryCastSupportSkill, tryTransform2dragon } from '@/battle';
import {
  autoBattleSwitchOff,
  cancelButton,
  closeButton,
  continueButtonRed,
  giveUpButtonBlue,
  giveUpButtonWhite,
  nextText,
  okButton,
  repeatBattleButton,
  repeatWithStaminaButton,
  retryButtonRed,
  startBattleButton,
  tapButton
} from '@/images';
import {
  clickImage,
  tryClickImage,
  tryFindImageInScreen,
  waitAndClickImage
} from '@/utils/image';

export async function repeatRaid(): Promise<void> {
  tryClickImage(startBattleButton);
  tryClickImage(autoBattleSwitchOff);
  tryClickImage(retryButtonRed);
  tryClickImage(okButton);
  tryClickImage(closeButton);
  tryClickImage(cancelButton);
  tryClickImage(tapButton);
  tryClickImage(nextText);
  if (tryClickImage(giveUpButtonWhite)) {
    await waitAndClickImage(giveUpButtonBlue, { timeout: 60e3 });
    throw new Error('队伍战力不足, 无法通关');
  }
  // tslint:disable-next-line: no-floating-promises
  tryRepeatWithStamina();
  // tslint:disable-next-line: no-floating-promises
  tryTransform2dragon();
  // tslint:disable-next-line: no-floating-promises
  tryCastSupportSkill();
}

async function tryRepeatWithStamina(): Promise<void> {
  try {
    await repeatWithStamina();
  } catch {
    tryClickImage(continueButtonRed);
  }
}
async function repeatWithStamina(): Promise<void> {
  clickImage(repeatBattleButton);
  await waitAndClickImage(repeatWithStaminaButton);
  await waitAndClickImage(okButton);
}
