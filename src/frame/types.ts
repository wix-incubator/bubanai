import { Page } from 'puppeteer-core';
import type { DocumentContext } from '../page';

export function isFrame(context: DocumentContext) {
  return 'name' in context;
}

export function isPage(page: DocumentContext): page is Page {
  return 'frames' in page;
}
