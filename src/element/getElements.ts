import { ElementHandle } from 'puppeteer';
import { SearchElementOptions } from './getElement';
import { DocumentContext } from '../page';

/**
 * Returns an array of the elements based on the provided selector.
 * Before retrieving the elements there is a wait function that checks the availability of at least one element.
 */
export async function getElements(
  context: DocumentContext,
  selectorOrElement: string | ElementHandle[],
  options?: SearchElementOptions,
): Promise<ElementHandle[]> {
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  await context.waitForSelector(selectorOrElement, options);
  const elements = await context.$$(selectorOrElement);

  if (elements.length === 0) {
    throw new Error(
      `There are no elements with selector ${selectorOrElement}.`,
    );
  }

  return elements;
}
