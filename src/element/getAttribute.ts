import { ElementHandle, Frame, Page } from 'puppeteer';

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
 */
export async function getAttribute(
  page: Page | Frame,
  element: ElementHandle,
  attribute: string | AttributeType,
): Promise<string | null> {
  const result = await page.evaluate(
    (e, elementAttribute) =>
      e.attributes[elementAttribute]
        ? e.attributes[elementAttribute].nodeValue
        : null,
    element,
    attribute,
  );

  return result;
}
