import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';
import { ElementPropertyType, getProperty } from '../getProperty';

/**
 * Verifies if the element is checked by verifying it's `checked` attribute.
 *
 * @category Element States
 */
export async function isChecked(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<boolean> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  const isCheckedProperty = await getProperty(
    ElementPropertyType.CHECKED,
    context,
    element,
  );

  return isCheckedProperty !== null;
}
