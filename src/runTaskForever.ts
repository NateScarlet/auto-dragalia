import { store } from '@/store';
import { taskRegistry } from '@/tasks';

export function runTaskForever(): void {
  if (store.currentTask !== undefined) {
    const taskName: string = store.currentTask;
    const handler: (() => void) | undefined = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    try {
      handler();
    } catch (err) {
      toast(err);
      sleep(3000);
      store.currentTask = undefined;
    }
  }
  sleep(1000);
  runTaskForever();
}
