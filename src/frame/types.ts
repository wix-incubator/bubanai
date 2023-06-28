import type { Frame, Page } from 'puppeteer-core';
import type { DocumentContext } from '../page';

/**
 * Checks if context is frame.
 * @param context
 *
 * @category Frame General
 */
export function isFrame(context: DocumentContext): context is Frame {
  return 'name' in context;
}

/**
 * Checks if context is page.
 * @param context
 *
 * @category Frame General
 */
export function isPage(context: DocumentContext): context is Page {
  return 'frames' in context;
}
