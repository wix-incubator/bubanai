import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';
import { ElementPropertyType, getProperty } from '../getProperty';

/**
 * Returns an array of classes for the specified element.
 * If there are no classes for the element returns an empty array.
 *
 * @category Element States
 */
export async function getClasses(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<string[]> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  const classes = await getProperty(
    ElementPropertyType.CLASS,
    context,
    element,
  );
  if (classes === null) {
    return [];
  }

  return classes.split(' ').filter(Boolean);
}
