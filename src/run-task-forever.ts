import store from '@/store';
import { taskRegistry } from '@/task-registry';

export function runTaskForever(): void {
  if (store.currentTask === null) {
    sleep(1000);
  } else {
    const taskName = store.currentTask;
    const handler = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    handler();
  }
  runTaskForever();
}
