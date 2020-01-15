import { farmRareItem } from '@/tasks/farmRareItem';
import { feedDragon } from '@/tasks/feedDragon';
import { feedFourLeafClover } from '@/tasks/feedFourLeafClover';
import { repeatRaid } from '@/tasks/repeatRaid';
import { tr } from '@/i18n';

export const taskRegistry: Record<
  string,
  (() => void | Promise<void>) | undefined
> = {};

export function setupTaskRegistry(): void {
  taskRegistry[tr('repeat-raid')] = repeatRaid;
  taskRegistry[tr('feed-dragon')] = feedDragon;
  taskRegistry[tr('feed-four-leaf-clover')] = feedFourLeafClover;
  taskRegistry[tr('farm-rare-item')] = farmRareItem;
}
