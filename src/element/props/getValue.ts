import { evaluateOnSelectorOrElement } from '../evaluateOnSelectorOrElement';
import { DocumentContext } from '../../page';
import { SearchElementOptions, SelectorOrElement } from '../types';

/**
 * Returns the value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the value.
 *
 * @category Element Actions
 */
export async function getValue(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
): Promise<string> {
  return evaluateOnSelectorOrElement(
    (e) => e.value,
    context,
    selectorOrElement,
    searchElementOptions,
  );
}
