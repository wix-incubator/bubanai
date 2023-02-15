import { Frame } from 'puppeteer-core';
import { waitFor } from '../waitFor';
import { WaitOptions } from '../types';

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
