import { Frame, Page } from 'puppeteer';
import { waitFor, WaitOptions } from '../../waitFor';

/**
 * Returns the frame by its source URL value.
 * With `isStrictMatch` the frame URL value must be strictly equal to the passed `src` value.
 *
 * @category Frame Search
 */
export async function getFrameBySrc(
  page: Page,
  src: string,
  isStrictMatch?: boolean,
  waitOptions?: WaitOptions,
): Promise<Frame> {
  let frameFn = () => page.frames().find((f) => f.url().includes(src));
  if (isStrictMatch) {
    frameFn = () => page.frames().find((f) => f.url() === src);
  }

  const timeoutMessage = `There is a timeout error while waiting for the frame with URL '${src}`;
  const message = `The frame with URL '${src} wasn't found.`;

  await waitFor(() => frameFn() !== undefined, waitOptions, timeoutMessage);
  const frame = frameFn();
  if (frame === undefined) {
    throw new Error(message);
  }

  return frame;
}
