interface IStore {
  currentTask: string | undefined;
}
export const store: IStore = {
  currentTask: undefined
};
