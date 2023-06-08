import { waitFor } from '../../waitFor';
import { waitToBeVisible } from './waitToBeVisible';
import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';

/**
 * Waits until the element will be in the viewport.
 * Before it there is a verification that the element is visible.
 *
 * @category Element Waits
 */
export async function waitForElementToBeInViewport(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  waitOptions?: WaitOptions,
): Promise<void> {
  const element = await waitToBeVisible(context, selectorOrElement);

  const timeoutMs =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : DefaultWaitOptions.timeoutMs;
  const errorMessage = `Element is not in viewport within ${
    timeoutMs / 1000
  } seconds timeout.`;

  await waitFor(
    () => element.isIntersectingViewport(),
    waitOptions,
    errorMessage,
  );
}
