import { DocumentContext } from '../../page';
import { ElementPropertyType, SelectorOrElement } from '../types';
import { DefaultWaitOptions, WaitOptions } from '../../types';
import { getProperty } from '../getProperty';
import { waitFor } from '../../waitFor';
import { TestError } from '../../error';

/**
 * Waits for element to have property value part.
 * @param context Page or Frame
 * @param element Element or selector
 * @param property Property name
 * @param value Property string value part
 * @param waitOptions WaitOptions
 *
 * @example `await element.type('1000 dsdsd');` <br>
 * `await waitForElementToHavePropertyPart(page, element, 'innerHtml', 'dsdsd');`
 *
 * @category Element Waits
 */
export function waitForElementToHavePropertyPart(
  context: DocumentContext,
  element: SelectorOrElement,
  property: ElementPropertyType,
  value: string,
  waitOptions?: WaitOptions,
) {
  const propertyFunc = async () =>
    getProperty(property, context, element).then((p) =>
      p.toString().includes(value),
    );
  return waitFor(
    propertyFunc,
    waitOptions,
    TestError.ElementDoesNotHavePropertyPart(
      property,
      value,
      waitOptions?.timeoutMs ?? DefaultWaitOptions.timeoutMs,
    ),
  );
}
