import { ElementHandle, Frame, Page } from 'puppeteer';

export interface ElementOptions {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
}

export async function getElements(
  context: Page | Frame,
  selector: string,
  options?: ElementOptions,
): Promise<ElementHandle> {
  const element = await context.waitForSelector(selector, options);
  if (element === null) {
    throw new Error(`The element by selector ${selector} wasn't found`);
  }

  return element;
}
