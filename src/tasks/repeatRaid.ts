import { tryTransform2dragon } from '@/battle';
import {
  autoBattleSwitchOff,
  closeButton,
  giveUpButton,
  okButton,
  repeatBattleButton,
  repeatWithStaminaButton,
  retryButton,
  startBattleButton
} from '@/images';
import { clickImage, tryClickImage } from '@/imageUtil';

export function repeatRaid(): void {
  tryClickImage(startBattleButton);
  tryClickImage(autoBattleSwitchOff);
  tryClickImage(retryButton);
  tryClickImage(okButton);
  tryClickImage(closeButton);
  tryClickImage(giveUpButton);
  tryTransform2dragon();
  try {
    clickImage(repeatBattleButton);
    sleep(500);
    clickImage(repeatWithStaminaButton);
    sleep(500);
    clickImage(okButton);
  } catch {
    console.verbose('Repeat button not visible');
  }
  sleep(1000);
}
