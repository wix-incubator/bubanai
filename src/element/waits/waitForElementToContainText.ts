import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { waitFor } from '../../waitFor';
import { getText } from '../props/getText';
import { DefaultWaitOptions, WaitOptions } from '../../types';

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
