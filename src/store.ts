/**
 * Application state storage
 */
class Store {
  public taskChangeListeners: ((
    newValue?: string,
    oldValue?: string
  ) => void)[] = [];

  private readonly state: {
    task?: string;
  };

  constructor() {
    this.state = {};
  }

  get currentTask(): string | undefined {
    return this.state.task;
  }
  set currentTask(value: string | undefined) {
    if (value === this.state.task) {
      return;
    }
    const oldValue: string | undefined = this.state.task;
    this.state.task = value;
    for (const i of this.taskChangeListeners) {
      i(value, oldValue);
    }
  }
}
export const store: Store = new Store();
