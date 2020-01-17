import { img } from '@/assets/images';
import { tryCastSupportSkill, tryTransform2dragon } from '@/utils/battle';
import { clickImage, tryClickImage, waitAndClickImage } from '@/utils/image';
import { tr } from '@/i18n';

async function repeatWithStamina(): Promise<void> {
  clickImage(img.repeatBattleButton);
  await waitAndClickImage(img.repeatWithStaminaButton);
  await waitAndClickImage(img.okButton);
}

async function tryRepeatWithStamina(): Promise<void> {
  try {
    await repeatWithStamina();
  } catch {
    tryClickImage(img.continueButtonRed);
  }
}

export async function repeatRaid(): Promise<void> {
  tryClickImage(img.startBattleButton);
  tryClickImage(img.autoBattleSwitchOff);
  tryClickImage(img.retryButtonRed);
  tryClickImage(img.okButton);
  tryClickImage(img.closeButton);
  tryClickImage(img.cancelButton);
  tryClickImage(img.tapButton);
  tryClickImage(img.nextText);
  if (tryClickImage(img.giveUpButtonWhite)) {
    await waitAndClickImage(img.giveUpButtonBlue, { timeout: 60e3 });
    throw new Error(tr('team-too-weak'));
  }
  tryTransform2dragon();
  tryCastSupportSkill();
  await tryRepeatWithStamina();
}
