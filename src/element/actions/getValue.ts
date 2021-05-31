import { ElementHandle, Frame, Page } from 'puppeteer';
import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SearchElementOptions } from '../getElement';

/**
 * Returns the value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the value.
 *
 * @category Element Actions
 */
export async function getValue(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<string> {
  return evaluateOnSelectorOrElement(
    (e) => e.value,
    context,
    selectorOrElement,
    searchElementOptions,
  );
}
