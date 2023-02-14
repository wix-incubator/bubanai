import { ElementHandle } from 'puppeteer-core';
import { SearchElementOptions } from './getElement';
import { DocumentContext } from '../page';
import { SelectorOrElements } from './types';

/**
 * Returns an array of the elements based on the provided selector.
 * Before retrieving the elements there is a wait function that checks the availability of at least one element.
 */
export async function getElements(
  context: DocumentContext,
  selectorOrElement: SelectorOrElements,
  options?: SearchElementOptions & { shouldBeNotEmpty: boolean },
): Promise<ElementHandle[]> {
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  options?.shouldBeNotEmpty &&
    (await context.waitForSelector(selectorOrElement, options));
  return context.$$(selectorOrElement);
}
