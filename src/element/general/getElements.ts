import type { DocumentContext } from '../../page';
import type { SearchElementsOptions, SelectorOrElements } from '../types';
import { elementsBySelectorType, waitBySelectorType } from '../utils';

/**
 * Returns an array of the elements based on the provided selector.
 * Before retrieving the elements there is a wait function that checks the availability of at least one element.
 *
 * @category Element General
 */
export async function getElements(
  context: DocumentContext,
  selectorOrElements: SelectorOrElements,
  options?: SearchElementsOptions,
) {
  if (typeof selectorOrElements !== 'string') {
    return selectorOrElements;
  }
  if (options?.shouldBeNotEmpty) {
    await waitBySelectorType(context, selectorOrElements);
  }
  return elementsBySelectorType(context, selectorOrElements);
}
