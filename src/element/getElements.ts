import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../page';
import { SearchElementsOptions, SelectorOrElements } from './types';

/**
 * Returns an array of the elements based on the provided selector.
 * Before retrieving the elements there is a wait function that checks the availability of at least one element.
 *
 * @category Element General
 */
export async function getElements(
  context: DocumentContext,
  selectorOrElement: SelectorOrElements,
  options?: SearchElementsOptions,
): Promise<ElementHandle[]> {
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  options?.shouldBeNotEmpty &&
    (await context.waitForSelector(selectorOrElement, options));
  return context.$$(selectorOrElement);
}
