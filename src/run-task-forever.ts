import { taskRegistry } from '@/task-registry';

export const STORAGE: Storage & {
  get(key: 'task'): string | undefined;
  put(key: 'task', value: string): void;
} = storages.create('net.pansx.auto-dragalia');

export function runTaskForever(): void {
  const taskName: string | undefined = STORAGE.get('task');
  if (taskName === undefined) {
    sleep(1000);
  } else {
    const handler = taskRegistry[taskName];
    if (!handler) {
      throw new Error(`Unknown task: ${taskName}`);
    }
    console.log(`运行任务: ${taskName}`);
    handler();
  }
  runTaskForever();
}
