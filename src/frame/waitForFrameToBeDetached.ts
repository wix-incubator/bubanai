import { Frame } from 'puppeteer-core';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

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
    `Frame with url: ${frame.url()} was not detached within timeout.`,
  );
}
