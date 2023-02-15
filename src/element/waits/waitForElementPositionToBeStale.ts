import { DocumentContext } from '../../page';
import { waitForValueToStopChanging } from '../../waits';
import { SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';

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
