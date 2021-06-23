import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';

/**
 * Waits until the element will be visible.
 *
 * @category Element Waits
 */
export async function waitToBeVisible(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<ElementHandle> {
  const defaultVisibilityOptions = {
    visible: true,
    hidden: false,
  };
  const mergedVisibilityOptions = {
    ...searchElementOptions,
    ...defaultVisibilityOptions,
  };

  return getElement(context, selectorOrElement, mergedVisibilityOptions);
}
