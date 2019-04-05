/**
 * Application state storage
 */
class Store {
  public onTaskChangeListeners: ((
    newValue?: string,
    oldValue?: string
  ) => void)[] = [];

  private internalCurrentTask?: string | undefined;

  get currentTask(): string | undefined {
    return this.internalCurrentTask;
  }
  set currentTask(value: string | undefined) {
    if (value === this.internalCurrentTask) {
      return;
    }
    const oldValue: string | undefined = this.internalCurrentTask;
    this.internalCurrentTask = value;
    for (const i of this.onTaskChangeListeners) {
      i(value, oldValue);
    }
  }
}
export const store: Store = new Store();
