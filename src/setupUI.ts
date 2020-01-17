import layoutTemplateXml from '@/layoutTemplate.xml';
import { store } from '@/store';
import { taskRegistry } from '@/tasks';
import { tr } from '@/i18n';

interface Spinner {
  setOnTouchListener(
    listener: (view: object, event: TouchEvent) => boolean
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
interface TouchEvent {
  ACTION_UP: object;
  ACTION_DOWN: object;
  ACTION_MOVE: object;
  getAction(): object;
  getRawX(): number;
  getRawY(): number;
}

type Window = floaty.FloatyWindow & {
  taskSpinner: Spinner;
};

const idleText: string = tr('idle-text');

function setupSpinner(window: Window, spinnerItems: string[]): void {
  window.taskSpinner.setOnItemSelectedListener({
    onItemSelected(): void {
      const taskName: string = window.taskSpinner.getSelectedItem();
      if (taskName === idleText) {
        store.currentTask = undefined;
      } else {
        store.currentTask = taskName;
      }
    },
    onNothingSelected(): void {
      throw new Error('This should never happen');
    }
  });
  store.taskChangeListeners.push((newValue?: string) => {
    ui.run(() => {
      window.taskSpinner.setSelection(
        spinnerItems.indexOf(newValue || idleText)
      );
    });
  });
}

export function setupUI(): {
  window: Window;
  spinnerItems: string[];
} {
  const spinnerItems: string[] = [idleText, ...Object.keys(taskRegistry)];
  const layout: string = layoutTemplateXml.replace(
    /\${entries}/g,
    spinnerItems.join('|')
  );
  const window: Window = floaty.window(layout) as Window;
  window.setAdjustEnabled(true);
  window.exitOnClose();

  setupSpinner(window, spinnerItems);

  // Empty timer for async syntax
  // https://hyb1996.github.io/AutoJs-Docs/#/floaty?id=floaty
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInterval(() => {}, 1e3);

  return { window, spinnerItems };
}
