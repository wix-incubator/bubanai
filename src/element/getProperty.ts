import { ElementHandle, Frame, Page } from 'puppeteer';

export enum ElementPropertyType {
  CHECKED = 'checked',
  DISABLED = 'disabled',
  REQUIRED = 'required',
  CLASS = 'className',
}

/**
 * Gets the element property value.
 * If the property value is absent returns `null`.
 */
export async function getProperty(
  page: Page | Frame,
  element: ElementHandle,
  property: ElementPropertyType,
): Promise<string | null> {
  const result = await page.evaluate(
    (e, elementProperty) => (e[elementProperty] ? e[elementProperty] : null),
    element,
    property,
  );
  return result;
}
