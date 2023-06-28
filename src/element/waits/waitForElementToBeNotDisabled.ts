import { waitFor } from '../../waitFor';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';
import type { DocumentContext } from '../../page';
import { isDisabled } from '../states/isDisabled';
import type { SelectorOrElement } from '../types';
import { TestError } from '../../error';

/**
 * Waits for element to have property 'disabled' or 'disabled' class.
 * If element is not assign class / property 'disabled' after disabling, this method wouldn't work.
 * @param context Page or Frame
 * @param elementHandle Selector or element
 * @param waitOptions WaitOptions
 *
 * @example `await panel.open();` <br>
 * `await waitForElementToBeNotDisabled(page, panelElement);`
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
    TestError.ElementIsLeftDisabled(
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
