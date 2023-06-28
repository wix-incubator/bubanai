import type { ElementHandle } from 'puppeteer-core';
import { waitForElement } from './waitForElement';
import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import type { WaitOptions } from '../../types';

/**
 * Waits until the element will be visible.
 *
 * @category Element Waits
 */
export async function waitToBeVisible(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
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
