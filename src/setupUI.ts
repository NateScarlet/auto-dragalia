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
  setSelection(pos: number): void;
}
interface ITouchEvent {
  ACTION_UP: object;
  ACTION_DOWN: object;
  ACTION_MOVE: object;
  getAction(): object;
  getRawX(): number;
  getRawY(): number;
}

const spinnerItems: string[] = ['停止', '重复战斗'];
export function setupUI(): floaty.FloatyWindow {
  type Window = floaty.FloatyWindow & {
    taskSpinner: ISpinner;
  };

  const window: Window = <Window>floaty.window(layoutXml);
  window.setAdjustEnabled(true);
  window.exitOnClose();

  // Setup spinner
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
  store.onTaskChangeListeners.push((newValue?: string) => {
    ui.run(() => {
      window.taskSpinner.setSelection(spinnerItems.indexOf(newValue || '停止'));
    });
  });

  return window;
}
