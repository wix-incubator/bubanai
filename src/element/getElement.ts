import { ElementHandle, Frame, Page } from 'puppeteer';

export interface SearchElementOptions {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
}

export async function getElement(
  context: Page | Frame,
  selector: string,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  // TDB
  const element = await context.waitForSelector(selector, options);
  if (element === null) {
    throw new Error(`The element by selector ${selector} wasn't found`);
  }

  return element;
}
