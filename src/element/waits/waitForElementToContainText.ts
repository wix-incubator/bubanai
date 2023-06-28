import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import { waitFor } from '../../waitFor';
import { getText } from '../props/getText';
import type { WaitOptions } from '../../types';
import { DefaultWaitOptions } from '../../types';
import { TestError } from '../../error';

/**
 * Waits for element to contain text.
 * @param context Page or Frame
 * @param element Element or selector
 * @param text Target text
 * @param waitOptions WaitOptions
 *
 * @example `await element.type('test /n');` <br>
 * `await waitForElementToContainText(page, element, 'test');`
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
    TestError.ElementIsNotContainText(
      text,
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
