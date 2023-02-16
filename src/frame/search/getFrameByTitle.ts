import { Frame } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getFrameBySelector } from './getFrameBySelector';

export async function getFrameByTitle(
  page: DocumentContext,
  title: string,
): Promise<Frame> {
  return getFrameBySelector(page, `iframe[title="${title}"]`);
}
