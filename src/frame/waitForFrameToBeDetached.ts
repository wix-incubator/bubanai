import type { Frame } from 'puppeteer-core';
import { waitFor } from '../waitFor';
import type { WaitOptions } from '../types';
import { DefaultWaitOptions } from '../types';
import { TestError } from '../error';

/**
 * Waits for frame not to exist.
 * @param frame
 * @param waitOptions
 *
 * @category Frame General
 */
export function waitForFrameToBeDetached(
  frame: Frame,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => Promise.resolve(frame.isDetached()),
    waitOptions,
    TestError.FrameWasNotDetached(
      frame.url(),
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
