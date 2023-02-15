import { DocumentContext } from '../../page';
import { waitForConditionToBeFalsy } from '../../waits/waitForConditionToBeFalsy';
import { isChecked } from '../states/isChecked';
import type { SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';

export function waitForElementToBeUnChecked(
  context: DocumentContext,
  element: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitForConditionToBeFalsy(
    () => isChecked(context, element),
    waitOptions,
    `Element is left checked after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    } s.`,
  );
}
