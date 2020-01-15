import { runTaskForever } from '@/runTaskForever';
import { setupUI } from '@/setupUI';
import { setupTaskRegistry } from '@/tasks';
import { name, version } from 'package.json';

// tslint:disable-next-line: no-floating-promises
(async (): Promise<void> => {
  console.log(`${name}: version=${version} asset=${TARGET_ASSET}`);

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
