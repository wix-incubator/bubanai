import { DocumentContext } from '../../page';
import { waitForConditionToBeFalsy } from '../../waits';
import { isChecked } from '../states/isChecked';
import type { SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Waits for element not to have property 'checked'.
 * If unchecking element is not changing this property, this method wouldn't work.
 * @param context Page or Frame
 * @param element Selector or element
 * @param waitOptions WaitOptions
 *
 * @example `await element.click();` <br>
 * `await waitForElementToBeUnChecked(page, element);`
 *
 * @category Element Waits
 */
export function waitForElementToBeUnChecked(
  context: DocumentContext,
  element: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitForConditionToBeFalsy(
    () => isChecked(context, element),
    waitOptions,
    TestError.ElementIsLeftChecked(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
