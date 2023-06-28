import type { DocumentContext } from '../../page';
import { isChecked } from '../states/isChecked';
import type { SelectorOrElement } from '../types';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';
import { waitFor } from '../../waitFor';
import { TestError } from '../../error';

/**
 * Waits for element to have property 'checked'.
 * If checking element is not changing this property, this method wouldn't work.
 * @param context Page or Frame
 * @param element Selector or element
 * @param waitOptions WaitOptions
 *
 * @example `await element.click();` <br>
 * `await waitForElementToBeChecked(page, element);`
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
    TestError.ElementIsNotChecked(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
