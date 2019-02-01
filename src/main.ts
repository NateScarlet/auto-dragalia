import { runTaskForever } from '@/runTaskForever';
import { setupUI } from '@/setupUI';
import { setupTaskRegistry } from '@/task-registry';
import { name, version } from 'package.json';

function main(): void {
  console.log(`${name}: ${version}`);
  images.requestScreenCapture(false);

  launch('com.nintendo.zaga');

  device.keepScreenOn(10000);

  setupTaskRegistry();
  setupUI();
  runTaskForever();
}

main();
