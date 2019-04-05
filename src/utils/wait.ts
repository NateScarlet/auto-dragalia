export async function wait(delay: number): Promise<void> {
  return new Promise(
    (resolve: () => void): void => {
      setTimeout(resolve, delay);
    }
  );
}
