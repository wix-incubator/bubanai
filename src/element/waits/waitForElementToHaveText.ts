import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';
import { waitForObjectsToBeEqual } from '../../waits';
import { getText } from '../props/getText';

/**
 * Waits for element to text to be equal to defined (exact match).
 * @param context Page or Frame
 * @param element Element or selector
 * @param text Target text
 * @param waitOptions WaitOptions
 *
 * @example `await element.type('test');` <br>
 * `await waitForElementToHaveText(page, element, 'test');`
 *
 * @category Element Waits
 */
export async function waitForElementToHaveText(
  context: DocumentContext,
  element: SelectorOrElement,
  text: string,
  waitOptions?: WaitOptions,
) {
  return waitForObjectsToBeEqual(
    () => getText(context, element),
    text,
    undefined,
    waitOptions,
  );
}
