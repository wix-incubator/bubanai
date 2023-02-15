import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { ACTION_TIMEOUT } from '../../settings';
import { waitForConditionToBeFalsy } from '../../waits/waitForConditionToBeFalsy';
import { getElement } from '../getElement';
import { WaitOptions } from '../../types';

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
