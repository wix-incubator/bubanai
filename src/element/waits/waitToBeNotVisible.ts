import { ElementHandle } from 'puppeteer-core';
import { WaitOptions } from '../../waitFor';
import { waitForElement } from './waitForElement';
import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';

/**
 * Waits until the element will be not visible.
 *
 * @category Element Waits
 */
export async function waitToBeNotVisible(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  waitOptions?: WaitOptions,
): Promise<ElementHandle> {
  const defaultVisibilityOptions = {
    visible: false,
    hidden: true,
  };
  return waitForElement(
    context,
    selectorOrElement,
    defaultVisibilityOptions,
    waitOptions,
  );
}
