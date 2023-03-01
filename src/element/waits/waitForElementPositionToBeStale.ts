import { DocumentContext } from '../../page';
import { waitForValueToStopChanging } from '../../waits';
import { SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';

/**
 * Waits for element position to stop changing.
 * If element disappears - that also counts like element position is stopped changing.
 * @param context Page or Frame
 * @param selectorOrElement Selector or element
 * @param waitOptions WaitOptions
 *
 * @example await dragTo(context, fromPoint, toPoint);
 * await waitForElementPositionToBeStale(page, element);
 *
 * @category Element Waits
 */
export async function waitForElementPositionToBeStale(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitForValueToStopChanging(
    () =>
      typeof selectorOrElement === 'string'
        ? context.$(selectorOrElement).then((el) => el && el.boundingBox())
        : selectorOrElement.boundingBox(),
    waitOptions,
  );
}
