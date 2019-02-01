import { clickImage, tryClickImage } from '@/image-util';
import {
  closeButton,
  okButton,
  repeatBattleButton,
  repeatWithStaminaButton,
  retryButton,
  startBattleButton
} from '@/images';

export async function repeatRaid() {
  tryClickImage(startBattleButton);
  tryClickImage(retryButton);
  tryClickImage(okButton);
  tryClickImage(closeButton);
  try {
    clickImage(repeatBattleButton);
    sleep(500);
    clickImage(repeatWithStaminaButton);
    sleep(500);
    clickImage(okButton);
  } catch {}
  sleep(1000);
}
