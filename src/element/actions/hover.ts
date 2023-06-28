import { getElement } from '../general/getElement';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';

/**
 * This method scrolls element into view if needed, and then performs hover over the center of the element.
 * If a selector was passed then the method tries to find the element first and only then performs hover action.
 *
 * @category Element Actions
 */
export async function hover(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
): Promise<void> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  await element.hover();
}
