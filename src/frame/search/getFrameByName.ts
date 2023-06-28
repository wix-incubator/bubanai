import type { Frame } from 'puppeteer-core';
import { waitFor } from '../../waitFor';
import { getFrames } from '../getFramesInContext';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';
import type { DocumentContext } from '../../page';
import { TestError } from '../../error';

/**
 * Returns the frame by its name attribute.
 *
 * @category Frame Search
 */
export async function getFrameByName(
  context: DocumentContext,
  frameName: string,
  waitOptions?: WaitOptions,
): Promise<Frame> {
  const frameFn = () =>
    getFrames(context).find((f) => f.name().includes(frameName));
  const error = TestError.FrameWithUrlWasNotFound(
    frameName,
    waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
  );

  await waitFor(() => frameFn() !== undefined, waitOptions, error);
  const frame = frameFn();
  if (frame === undefined) {
    throw new Error(error);
  }

  return frame;
}
