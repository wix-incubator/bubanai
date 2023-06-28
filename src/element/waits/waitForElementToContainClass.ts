import type { SelectorOrElement } from '../types';
import type { DocumentContext } from '../../page';
import { waitForElementToHaveAttributePart } from './waitForElementToHaveAttributePart';
import { AttributeType } from '../../selector';
import type { WaitOptions } from '../../types';

/**
 * Waits for element to contain class (or class part).
 * @param context Page or Frame
 * @param element Element or selector
 * @param valuePart Class name or name part
 * @param waitOptions WaitOptions
 *
 * @example `await element.click();` <br>
 * `await waitForElementToContainClass(page, element, 'focused');`
 *
 * @category Element Waits
 */
export function waitForElementToContainClass(
  context: DocumentContext,
  element: SelectorOrElement,
  valuePart: string,
  waitOptions?: WaitOptions,
) {
  return waitForElementToHaveAttributePart(
    context,
    element,
    AttributeType.CLASS,
    valuePart,
    waitOptions,
  );
}
