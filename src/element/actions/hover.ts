import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';

/**
 * This method scrolls element into view if needed, and then performs hover over the center of the element.
 * If a selector was passed then the method tries to find the element first and only then performs hover action.
 *
 * @category Element Actions
 */
export async function hover(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<void> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  await element.hover();
}
