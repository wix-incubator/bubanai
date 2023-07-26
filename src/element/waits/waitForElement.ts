import { getElement } from '../general/getElement';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';

/**
 * Similar to getElement, just another naming and merging options.
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param defaultVisibilityOptions SearchElementOptions
 * @param waitOptions WaitOptions
 *
 * @example `const element = await waitForElement(page, 'div[class='test'], {visible: true, timeout: 2000});`
 *
 * @category Element Waits
 */
export async function waitForElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  defaultVisibilityOptions: SearchElementOptions,
  waitOptions?: WaitOptions,
) {
  const timeout =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : DefaultWaitOptions.timeoutMs;
  const mergedVisibilityOptions = {
    ...defaultVisibilityOptions,
    timeout,
  };

  return getElement(context, selectorOrElement, mergedVisibilityOptions);
}
