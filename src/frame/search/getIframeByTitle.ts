import { Frame } from 'puppeteer-core';
import { DocumentContext } from '../../page';
import { getIframeBySelector } from './getIframeBySelector';

export async function getIFrameByTitle(
  page: DocumentContext,
  title: string,
): Promise<Frame> {
  return getIframeBySelector(page, `iframe[title="${title}"]`);
}
