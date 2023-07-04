import type { DocumentContext } from '../../page';
import { getParent } from './getParent';
import type { SelectorOrElement } from '../types';
import type { ClickOptions } from 'puppeteer-core';

/**
 * Clicks on parent element of current element
 * @param context Page or Frame
 * @param elementOrSelector Element or selector
 * @param options Click Options
 *
 * @category Element Actions
 */
export async function clickOnParent(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
  options?: ClickOptions,
): Promise<void> {
  return getParent(context, elementOrSelector).then((p) => p.click(options));
}
