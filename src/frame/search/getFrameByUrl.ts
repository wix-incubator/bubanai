import { Frame } from 'puppeteer-core';
import { waitFor } from '../../waitFor';
import { DocumentContext } from '../../page';
import { getFrames } from '../getFramesInContext';
import { StringOrRegExp, WaitOptions } from '../../types';

/**
 * Returns the frame by its source URL value.
 * With `isStrictMatch` the frame URL value must be strictly equal to the passed `frameUrl` value.
 *
 * @category Frame Search
 */
export async function getFrameByUrl(
  context: DocumentContext,
  frameUrl: StringOrRegExp,
  isStrictMatch?: boolean,
  waitOptions?: WaitOptions,
): Promise<Frame> {
  let frameFn = () =>
    getFrames(context).find((f) =>
      typeof frameUrl === 'string'
        ? f.url().includes(frameUrl)
        : !!f.url().match(frameUrl),
    );
  if (isStrictMatch && typeof frameUrl !== 'string') {
    throw new Error('RegExp with strict match are not compatible.');
  }
  if (isStrictMatch) {
    frameFn = () => getFrames(context).find((f) => f.url() === frameUrl);
  }

  const timeoutMessage = `There is a timeout error while waiting for the frame with URL '${frameUrl.toString()}'`;
  const message = `The frame with URL '${frameUrl.toString()}' wasn't found.`;

  await waitFor(() => frameFn() !== undefined, waitOptions, timeoutMessage);
  const frame = frameFn();
  if (frame === undefined) {
    throw new Error(message);
  }

  return frame;
}
