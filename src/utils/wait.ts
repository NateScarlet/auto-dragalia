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

/**
 * https://hyb1996.github.io/AutoJs-Docs/#/globals?id=toastmessage
 */
export async function waitToast(): Promise<void> {
  return wait(2000);
}
