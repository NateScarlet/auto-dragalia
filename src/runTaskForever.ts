import { store } from '@/store';
import { taskRegistry } from '@/tasks';
import { wait } from '@/utils/wait';
import { version } from 'package.json';

export async function runTaskForever(): Promise<void> {
  if (!store.currentTask) {
    await wait(1000);
    await runTaskForever();

    return;
  }

  const handler: (() => Promise<void> | void) | undefined =
    taskRegistry[store.currentTask];
  if (!handler) {
    throw new Error(`Unknown task: ${store.currentTask}`);
  }

  console.log(`运行任务: ${store.currentTask}`);
  try {
    await handler();
  } catch (err) {
    console.show();
    console.error(`${version}: ${err}`);
    device.vibrate(0.5e3);
    store.currentTask = undefined;
  }
  await wait(1000);
  await runTaskForever();
}
