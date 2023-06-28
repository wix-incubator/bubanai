import type { SearchElementsOptions, SelectorOrElements } from '../types';
import { getElements } from '../general/getElements';
import type { DocumentContext } from '../../page';

/**
 * Returns the number of elements by the provided selector.
 *
 * @category Element Actions
 */
export async function getElementsCollectionLength(
  context: DocumentContext,
  selectorOrElements: SelectorOrElements,
  searchElementOptions?: SearchElementsOptions,
): Promise<number> {
  const elements = await getElements(
    context,
    selectorOrElements,
    searchElementOptions,
  );
  return elements.length;
}
