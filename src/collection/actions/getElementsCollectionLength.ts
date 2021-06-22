import { ElementHandle, Frame, Page } from 'puppeteer';
import { SearchElementOptions } from '../../element/getElement';
import { getElements } from '../getElements';

/**
 * Returns the number of elements by the provided selector.
 *
 * @category Collection Actions
 */
export async function getElementsCollectionLength(
  context: Page | Frame,
  selectorOrElements: string | ElementHandle[],
  searchElementOptions?: SearchElementOptions,
): Promise<number> {
  const elements = await getElements(
    context,
    selectorOrElements,
    searchElementOptions,
  );
  return elements.length;
}
