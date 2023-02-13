import { ElementHandle } from 'puppeteer-core';
import { getElement, SearchElementOptions } from './getElement';
import { AttributeType } from '../selector';
import { DocumentContext } from '../page';

/**
 * Gets the element attribute value.
 * If the attribute value is absent returns `null`.
 * If a selector was passed then the method tries to find the element and only then returns the attribute value.
 */
export async function getAttribute(
  attribute: AttributeType,
  context: DocumentContext,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<string | null> {
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

  return result;
}
