import { store } from '@/store';
import { taskRegistry } from '@/taskRegistry';

export function runTaskForever(): void {
  if (store.currentTask !== undefined) {
    const taskName: string = store.currentTask;
    const handler: (() => void) | undefined = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    handler();
  }
  sleep(1000);
  runTaskForever();
}
