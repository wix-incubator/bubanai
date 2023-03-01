import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { ACTION_TIMEOUT } from '../../settings';
import { waitForConditionToBeFalsy } from '../../waits';
import { getElement } from '../getElement';
import { WaitOptions } from '../../types';

/**
 * Waits for element not to be in viewport. Using method isIntersectingViewport()
 * that can sometimes return incorrect value
 * (example - in cases of animation when element is disappears but isIntersectingViewport() returns true)
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param waitOptions WaitOptions
 *
 * @example await waitForElementNotToBeInViewport(page, [data-hook='side-panel']);
 *
 * @category Element Waits
 */
export async function waitForElementNotToBeInViewport(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  waitOptions?: WaitOptions,
): Promise<void> {
  const errorMessage = `Element is still in viewport within ${
    waitOptions?.timeoutMs ?? ACTION_TIMEOUT
  } seconds timeout.`;
  await waitForConditionToBeFalsy(
    () =>
      getElement(context, selectorOrElement).then((el) =>
        el.isIntersectingViewport(),
      ),
    waitOptions,
    errorMessage,
  );
}
