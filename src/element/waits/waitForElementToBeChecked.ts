import { DocumentContext } from '../../page';
import { isChecked } from '../states/isChecked';
import type { SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { waitFor } from '../../waitFor';

export function waitForElementToBeChecked(
  context: DocumentContext,
  element: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => isChecked(context, element),
    waitOptions,
    `Element is NOT checked after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    } s.`,
  );
}
