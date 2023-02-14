import { getElement, SearchElementOptions } from '../getElement';
import { getProperty } from '../getProperty';
import { DocumentContext } from '../../page';
import { ElementPropertyType, SelectorOrElement } from '../types';

/**
 * Returns an array of classes for the specified element.
 * If there are no classes for the element returns an empty array.
 *
 * @category Element States
 */
export async function getClasses(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
): Promise<string[]> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  const classes = await getProperty(
    ElementPropertyType.class,
    context,
    element,
  );
  if (classes === null) {
    return [];
  }

  return classes.split(' ').filter(Boolean);
}
