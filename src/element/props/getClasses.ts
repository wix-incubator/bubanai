import { getElement } from '../general/getElement';
import { getProperty } from './getProperty';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';

/**
 * Returns an array of classes for the specified element.
 * If there are no classes for the element returns an empty array.
 *
 * @category Element Properties
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

  const classes = await getProperty('className', context, element);
  if (classes === null) {
    return [];
  }

  return classes.split(' ').filter(Boolean);
}
