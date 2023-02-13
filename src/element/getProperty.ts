import { ElementHandle } from 'puppeteer-core';
import { getElement, SearchElementOptions } from './getElement';
import { DocumentContext } from '../page';

export enum ElementPropertyType {
  CHECKED = 'checked',
  DISABLED = 'disabled',
  REQUIRED = 'required',
  CLASS = 'className',
}

/**
 * Gets the element property value.
 * If the property value is absent returns `null`.
 * If a selector was passed then the method tries to find the element and only then returns the property value.
 */
export async function getProperty(
  property: ElementPropertyType,
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
    (e, elementProperty) => (e[elementProperty] ? e[elementProperty] : null),
    element,
    property,
  );
  return result;
}
