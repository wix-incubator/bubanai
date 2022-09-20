import { ElementHandle, Frame, Page } from 'puppeteer-core';

export interface SearchElementOptions {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
}

export async function getElement(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  // TDB
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  const element = await context.waitForSelector(selectorOrElement, options);
  if (element === null) {
    throw new Error(
      `The element by selector ${selectorOrElement} wasn't found.`,
    );
  }

  return element;
}
