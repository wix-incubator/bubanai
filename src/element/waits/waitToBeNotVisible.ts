import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';

/**
 * Waits until the element will be not visible.
 *
 * @category Element Waits
 */
export async function waitToBeNotVisible(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<ElementHandle> {
  const defaultVisibilityOptions = {
    visible: false,
    hidden: true,
  };
  const mergedVisibilityOptions = {
    ...searchElementOptions,
    defaultVisibilityOptions,
  };

  return getElement(context, selectorOrElement, mergedVisibilityOptions);
}
