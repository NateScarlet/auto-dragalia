import {
  clickImage,
  tryClickImage,
  tryClickTransformationButton
} from '@/image-util';
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

export async function repeatRaid() {
  tryClickImage(startBattleButton);
  tryClickImage(autoBattleSwitchOff);
  tryClickImage(retryButton);
  tryClickImage(okButton);
  tryClickImage(closeButton);
  tryClickImage(giveUpButton);
  tryClickTransformationButton();
  try {
    clickImage(repeatBattleButton);
    sleep(500);
    clickImage(repeatWithStaminaButton);
    sleep(500);
    clickImage(okButton);
  } catch {}
  sleep(1000);
}
