import { ElementHandle } from 'puppeteer-core';
import { DocumentContext } from '../page';
import { SearchElementOptions, SelectorOrElement } from './types';

export async function getElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  // TDB
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  const element = await context.waitForSelector(selectorOrElement, options);
  if (element === null) {
    throw new Error(
      `The element by selector ${selectorOrElement} wasn't found.`,
    );
  }

  return element;
}
