import { getElement } from './getElement';
import { AttributeType } from '../selector';
import { DocumentContext } from '../page';
import { SearchElementOptions, SelectorOrElement } from './types';

/**
 * Gets the element attribute value.
 * If a selector was passed then the method tries to find the element and only then returns the attribute value.
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
