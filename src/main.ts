import { runTaskForever } from '@/run-task-forever';
import { setupTaskRegistry } from '@/task-registry';
import { name, version } from 'package.json';
import { setupUI } from './ui';

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
