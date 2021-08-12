import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SearchElementOptions } from '../getElement';

/**
 * Returns the text value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the text value.
 *
 * @category Element Actions
 */
export async function getText(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<string> {
  return evaluateOnSelectorOrElement(
    (e) => (e.innerText ? e.innerText : e.innerHtml),
    context,
    selectorOrElement,
    searchElementOptions,
  );
}
