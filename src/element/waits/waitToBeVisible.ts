import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { WaitOptions } from '../../waitFor';
import { waitForElement } from './waitForElement';

/**
 * Waits until the element will be visible.
 *
 * @category Element Waits
 */
export async function waitToBeVisible(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  waitOptions?: WaitOptions,
): Promise<ElementHandle> {
  const defaultVisibilityOptions = {
    visible: true,
    hidden: false,
  };
  return waitForElement(
    context,
    selectorOrElement,
    defaultVisibilityOptions,
    waitOptions,
  );
}
