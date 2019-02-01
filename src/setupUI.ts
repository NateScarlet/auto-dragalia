import layoutXml from '@/layout.xml';
import { store } from '@/store';

interface IButton {
  click(callback: () => void): void;
  setText(text: string): void;
  setOnTouchListener(
    listener: (view: object, event: ITouchEvent) => boolean
  ): void;
}
interface ISpinner {
  setOnTouchListener(
    listener: (view: object, event: ITouchEvent) => boolean
  ): void;
  setOnItemSelectedListener(listener: {
    onItemSelected(
      parent: object,
      view: object,
      position: number,
      id: number
    ): void;
    onNothingSelected(parent: object): void;
  }): void;
  getSelectedItem(): string;
}
interface ITouchEvent {
  ACTION_UP: object;
  ACTION_DOWN: object;
  ACTION_MOVE: object;
  getAction(): object;
  getRawX(): number;
  getRawY(): number;
}

export function setupUI(): floaty.FloatyWindow {
  type Window = floaty.FloatyWindow & {
    taskSpinner: ISpinner;
  };

  const window: Window = <Window>floaty.window(layoutXml);
  window.setAdjustEnabled(true);
  window.exitOnClose();

  window.taskSpinner.setOnItemSelectedListener({
    onItemSelected(): void {
      const taskName: string = window.taskSpinner.getSelectedItem();

      toast(taskName);
      if (taskName === '停止') {
        store.currentTask = undefined;
      } else {
        store.currentTask = taskName;
      }
    },
    onNothingSelected(): void {
      throw new Error('This should never happen');
    }
  });

  return window;
}
