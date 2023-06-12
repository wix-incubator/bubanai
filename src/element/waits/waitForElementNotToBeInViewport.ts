import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { waitForConditionToBeFalsy } from '../../waits';
import { getElement } from '../getElement';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Waits for element not to be in viewport. Using method isIntersectingViewport()
 * that can sometimes return incorrect value
 * (example - in cases of animation when element is disappears but isIntersectingViewport() returns true)
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param waitOptions WaitOptions
 *
 * @example `await waitForElementNotToBeInViewport(page, [data-hook='side-panel']);`
 *
 * @category Element Waits
 */
export async function waitForElementNotToBeInViewport(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  waitOptions?: WaitOptions,
): Promise<void> {
  await waitForConditionToBeFalsy(
    () =>
      getElement(context, selectorOrElement).then((el) =>
        el.isIntersectingViewport(),
      ),
    waitOptions,
    TestError.ElementIsStillInViewport(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
