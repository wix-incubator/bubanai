import { DocumentContext } from '../../page';
import { waitForValueToStopChanging } from '../../waits';
import { SelectorOrElement } from '../types';

export async function waitForElementPositionToBeStale(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  timeout?: number,
  interval?: number,
) {
  return waitForValueToStopChanging(
    () =>
      typeof selectorOrElement === 'string'
        ? context.$(selectorOrElement).then((el) => el && el.boundingBox())
        : selectorOrElement.boundingBox(),
    timeout,
    interval,
  );
}
