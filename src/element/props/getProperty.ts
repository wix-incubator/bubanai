import { getElement } from '../general/getElement';
import type { DocumentContext } from '../../page';
import type {
  ElementPropertyType,
  SearchElementOptions,
  SelectorOrElement,
} from '../types';

/**
 * Gets the element property value.
 * If a selector was passed then the method tries to find the element and only then returns the property value.
 *
 * @category Element Properties
 */
export async function getProperty(
  property: ElementPropertyType,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
) {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );
  return context.evaluate(
    (e, elementProperty) => e[elementProperty],
    element,
    property,
  );
}
