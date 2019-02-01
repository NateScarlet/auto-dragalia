interface IStore {
  currentTask: string | null;
}
const store: IStore = {
  currentTask: null
};
export default store;
