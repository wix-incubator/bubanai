import { DocumentContext } from '../../page';
import { ElementPropertyType, SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';
import { waitForObjectsToBeEqual } from '../../waits/waitForObjectsToBeEqual';
import { getProperty } from '../getProperty';

/**
 * Waits for element to have property value (exact match).
 * @param context Page or Frame
 * @param element Element or selector
 * @param property Property name
 * @param value Property string value
 * @param waitOptions WaitOptions
 *
 * @example `await element.check();` <br>
 * `await waitForElementToHaveProperty(page, element, 'checked', 'true');`
 *
 * @category Element Waits
 */
export function waitForElementToHaveProperty(
  context: DocumentContext,
  element: SelectorOrElement,
  property: ElementPropertyType,
  value: string,
  waitOptions?: WaitOptions,
) {
  const propertyFunc = async () =>
    getProperty(property, context, element).then((p) => p.toString());
  return waitForObjectsToBeEqual(
    propertyFunc,
    value,
    propertyFunc,
    waitOptions,
  );
}
