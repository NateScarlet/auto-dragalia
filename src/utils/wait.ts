export async function wait(delay: number): Promise<void> {
  if (delay <= 0) {
    return;
  }

  return new Promise(
    (resolve: () => void): void => {
      setTimeout(resolve, delay);
    }
  );
}
