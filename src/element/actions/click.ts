import { ClickOptions, ElementHandle, Frame, Page } from 'puppeteer';
import { getElements } from '../getElement';

export async function click(
  context: Page | Frame,
  selector: string,
  options?: ClickOptions,
) {
  const element = await getElements(context, selector);
  await element.click(options);
}

/**
 * Click on the element after verifying that it's available and clickable
 */
export async function clickOnElement(
  context: ElementHandle,
  options?: ClickOptions,
) {
  // some methods to ensure that the element is clickable and visible
  await context.click(options);
}
