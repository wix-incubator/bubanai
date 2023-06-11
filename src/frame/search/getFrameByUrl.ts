import { Frame } from 'puppeteer-core';
import { waitFor } from '../../waitFor';
import { DocumentContext } from '../../page';
import { getFrames } from '../getFramesInContext';
import { DefaultWaitOptions, StringOrRegExp, WaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Returns the frame by its source URL value or Reg Exp.
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
    throw new Error(TestError.RegExpWithStrictMatch());
  }
  if (isStrictMatch) {
    frameFn = () => getFrames(context).find((f) => f.url() === frameUrl);
  }
  const error = TestError.FrameWithUrlWasNotFound(
    JSON.stringify(frameUrl),
    waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
  );
  await waitFor(() => frameFn() !== undefined, waitOptions, error);
  const frame = frameFn();
  // this would happen only if frame re-rendered again after wait
  if (frame === undefined) {
    throw new Error(error);
  }

  return frame;
}
