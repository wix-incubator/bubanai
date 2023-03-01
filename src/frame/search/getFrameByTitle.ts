import { Frame } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getFrameBySelector } from './getFrameBySelector';

/**
 * Returns frame instance by it's title attribute.
 * @param context Page or frame
 * @param title Title attribute
 *
 * @category Frame Search
 */
export async function getFrameByTitle(
  context: DocumentContext,
  title: string,
): Promise<Frame> {
  return getFrameBySelector(context, `iframe[title="${title}"]`);
}
