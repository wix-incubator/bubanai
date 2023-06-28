import { evaluateOnSelectorOrElement } from '../actions/evaluateOnSelectorOrElement';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';

/**
 * Returns the value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the value.
 *
 * @category Element Properties
 */
export async function getValue(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
) {
  return evaluateOnSelectorOrElement(
    (e) => e.value,
    context,
    selectorOrElement,
    searchElementOptions,
  );
}
