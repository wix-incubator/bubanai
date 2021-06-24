import { ElementHandle, Frame, Page } from 'puppeteer';
import { ACTION_TIMEOUT } from '../../settings';
import { waitFor, WaitOptions } from '../../waitFor';
import { waitToBeVisible } from './waitToBeVisible';

/**
 * Waits until the element will be in the viewport.
 * Before it there is a verification that the element is visible.
 *
 * @category Element Waits
 */
export async function waitToBeInViewport(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  waitOptions?: WaitOptions,
): Promise<void> {
  const element = await waitToBeVisible(context, selectorOrElement);

  const timeoutMs =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : ACTION_TIMEOUT;
  const errorMessage = `Element is not in viewport within ${
    timeoutMs / 1000
  } seconds timeout.`;

  await waitFor(
    () => element.isIntersectingViewport(),
    waitOptions,
    errorMessage,
  );
}
