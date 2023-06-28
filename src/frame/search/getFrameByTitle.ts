import type { Frame } from 'puppeteer-core';
import type { DocumentContext } from '../../page';
import { getFrameBySelector } from './getFrameBySelector';
import type { WaitOptions } from '../../types';

/**
 * Returns frame instance by it's title attribute.
 * @param context Page or frame
 * @param title Title attribute
 * @param waitOptions Frame wait options
 *
 * @category Frame Search
 */
export async function getFrameByTitle(
  context: DocumentContext,
  title: string,
  waitOptions?: WaitOptions,
): Promise<Frame> {
  return getFrameBySelector(context, `iframe[title="${title}"]`, waitOptions);
}
