import { ElementHandle } from 'puppeteer-core';
import { WaitOptions } from '../../waitFor';
import { waitForElement } from './waitForElement';
import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';

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
