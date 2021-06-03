import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from './getElement';

export enum AttributeType {
  DATA_HOOK = 'data-hook',
  NAME = 'name',
  ROLE = 'role',
  VALUE = 'value',
  ID = 'id',
  STYLE = 'style',
  SRC = 'src',
  DATA_DISABLED = 'data-disabled',
}

/**
 * Gets the element attribute value.
 * If the attribute value is absent returns `null`.
 * If a selector was passed then the method tries to find the element and only then returns the attribute value.
 */
export async function getAttribute(
  attribute: string | AttributeType,
  context: Page | Frame,
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
