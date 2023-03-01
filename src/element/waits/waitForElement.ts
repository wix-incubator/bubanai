import { ElementHandle } from 'puppeteer-core';
import { ACTION_TIMEOUT } from '../../settings';
import { getElement } from '../getElement';
import { DocumentContext } from '../../page';
import { SearchElementOptions, SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';

/**
 * Similar to getElement, just another naming and merging options.
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param defaultVisibilityOptions SearchElementOptions
 * @param waitOptions WaitOptions
 *
 * @example const element = await waitForElement(page, 'div[class='test'], {visible: true, timeout: 2000});
 *
 * @category Element Waits
 */
export async function waitForElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  defaultVisibilityOptions: SearchElementOptions,
  waitOptions?: WaitOptions,
): Promise<ElementHandle> {
  const timeout =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : ACTION_TIMEOUT;
  const mergedVisibilityOptions = {
    ...defaultVisibilityOptions,
    timeout,
  };

  return getElement(context, selectorOrElement, mergedVisibilityOptions);
}
