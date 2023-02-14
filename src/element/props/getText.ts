import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { SearchElementOptions } from '../getElement';
import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';

/**
 * Returns the text value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the text value.
 *
 * @category Element Actions
 */
export async function getText(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
): Promise<string> {
  return evaluateOnSelectorOrElement(
    (e) => (e.innerText ? e.innerText : e.innerHtml),
    context,
    selectorOrElement,
    searchElementOptions,
  );
}
