import { feedDragon } from '@/tasks/feedDragon';
import { repeatRaid } from '@/tasks/repeatRaid';

export const taskRegistry: Record<
  string,
  (() => void | Promise<void>) | undefined
> = {};

export function setupTaskRegistry(): void {
  taskRegistry.重复战斗 = repeatRaid;
  taskRegistry.自动喂龙 = feedDragon;
}
