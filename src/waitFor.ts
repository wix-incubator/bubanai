const ACTION_TIMEOUT = 30 * 1000;
const ACTION_POLL_INTERVAL = 500;

export interface WaitOptions {
  timeout?: number;
  pollInterval?: number;
}

/**
 * Generic wait function that receives the function
 * and polls it with the specific time interval until it will return true.
 */
export async function waitFor(
  action: () => Promise<boolean> | boolean,
  waitOptions?: WaitOptions,
  exceptionMessage?: string,
): Promise<void> {
  const timeout =
    waitOptions && waitOptions.timeout ? waitOptions.timeout : ACTION_TIMEOUT;
  const pollInterval =
    waitOptions && waitOptions.pollInterval
      ? waitOptions.pollInterval
      : ACTION_POLL_INTERVAL;

  let isTimeout = false;
  setTimeout(() => {
    isTimeout = true;
  }, timeout);

  while (!isTimeout && !(await action())) {
    await wait(pollInterval);
  }

  if (isTimeout) {
    throw new Error(
      exceptionMessage ||
        `Wait for condition failed after ${timeout / 1000} seconds timeout.`,
    );
  }
}

async function wait(interval: number) {
  return new Promise((resolve) => setTimeout(resolve, interval));
}
