import { Frame } from 'puppeteer-core';
import { waitFor } from '../../waitFor';
import { getFrames } from '../getFramesInContext';
import { WaitOptions } from '../../types';
import { DocumentContext } from '../../page';

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
  const timeoutMessage = `There is a timeout error while waiting for the frame with name '${frameName}'`;
  const message = `The frame with name '${frameName}' wasn't found.`;

  await waitFor(() => frameFn() !== undefined, waitOptions, timeoutMessage);
  const frame = frameFn();
  if (frame === undefined) {
    throw new Error(message);
  }

  return frame;
}
