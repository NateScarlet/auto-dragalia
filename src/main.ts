import { runTaskForever } from '@/runTaskForever';
import { setupUI } from '@/setupUI';
import { setupTaskRegistry } from '@/tasks';
import { name, version } from 'package.json';
import { tr } from '@/i18n';

(async (): Promise<void> => {
  console.log(
    tr('banner', {
      name,
      version,
      asset: TARGET_ASSET,
      locale: TARGET_LOCALE
    })
  );

  try {
    launch('com.nintendo.zaga');

    device.keepScreenOn(10000);

    setupTaskRegistry();
    setupUI();
    await runTaskForever();
  } catch (err) {
    console.error(JSON.stringify(err));
  }
})();
