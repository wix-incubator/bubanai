import { ElementHandle } from 'puppeteer-core';
import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SearchElementOptions } from '../getElement';
import { DocumentContext } from '../../page';

/**
 * Returns the value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the value.
 *
 * @category Element Actions
 */
export async function getValue(
  context: DocumentContext,
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
