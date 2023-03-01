import { DocumentContext } from '../../page';
import { isChecked } from '../states/isChecked';
import type { SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { waitFor } from '../../waitFor';

/**
 * Waits for element to have property 'checked'.
 * If checking element is not changing this property, this method wouldn't work.
 * @param context Page or Frame
 * @param element Selector or element
 * @param waitOptions WaitOptions
 *
 * @example await element.click();
 * await waitForElementToBeChecked(page, element);
 *
 * @category Element Waits
 */
export function waitForElementToBeChecked(
  context: DocumentContext,
  element: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => isChecked(context, element),
    waitOptions,
    `Element is NOT checked after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    } s.`,
  );
}
