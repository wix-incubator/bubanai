import { waitFor } from '../../waitFor';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { DocumentContext } from '../../page';
import { isDisabled } from '../states/isDisabled';
import { SelectorOrElement } from '../types';

/**
 * Waits for element to have property 'disabled' or 'disabled' class.
 * If element is not assign class / property 'disabled' after disabling, this method wouldn't work.
 * @param context Page or Frame
 * @param elementHandle Selector or element
 * @param waitOptions WaitOptions
 *
 * @example await panel.open();
 * await waitForElementToBeNotDisabled(page, panelElement);
 *
 * @category Element Waits
 */
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
