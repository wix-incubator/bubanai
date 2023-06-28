import { getElement } from '../general/getElement';
import type { AttributeType } from '../../selector';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';

/**
 * Gets the element attribute value.
 * If a selector was passed then the method tries to find the element and only then returns the attribute value.
 *
 * @category Element Properties
 */
export async function getAttribute(
  attribute: AttributeType,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
) {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  const result = await context.evaluate(
    (e, elementAttribute) =>
      e.attributes[elementAttribute]
        ? e.attributes[elementAttribute].nodeValue
        : null,
    element,
    attribute,
  );

  return result as string;
}
