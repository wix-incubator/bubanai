import { Frame } from 'puppeteer-core';
import { waitFor, WaitOptions } from '../waitFor';

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
