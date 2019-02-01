import { repeatRaid } from '@/tasks/repeat-raid';

export const taskRegistry: Record<
  string,
  (() => void | Promise<void>) | undefined
> = {};

export function setupTaskRegistry() {
  taskRegistry['重复战斗'] = repeatRaid;
}
