import { waitFor } from '../../waitFor';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { DocumentContext } from '../../page';
import { isDisabled } from '../states/isDisabled';
import { SelectorOrElement } from '../types';

export function waitForElementToBeNotDisabled(
  context: DocumentContext,
  elementHandle: SelectorOrElement,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    async () => !(await isDisabled(context, elementHandle)),
    waitOptions,
    `Element is left disabled after timeout ${
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs / 1000
    } s.`,
  );
}
