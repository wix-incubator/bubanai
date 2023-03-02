import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { waitFor } from '../../waitFor';
import { getText } from '../props/getText';
import { DefaultWaitOptions, WaitOptions } from '../../types';

/**
 * Waits for element to contain text.
 * @param context Page or Frame
 * @param element Element or selector
 * @param text Target text
 * @param waitOptions WaitOptions
 *
 * @example await element.type('test /n'); <br>
 * await waitForElementToContainText(page, element, 'test');
 *
 * @category Element Waits
 */
export async function waitForElementToContainText(
  context: DocumentContext,
  element: SelectorOrElement,
  text: string,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () =>
      getText(context, element).then(
        (elementText) => elementText.indexOf(text) !== -1,
      ),
    waitOptions,
    `Element doesn't contain text ${text} after timeout ${
      waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs
    } s.`,
  );
}
