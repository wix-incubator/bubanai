import type { ElementHandle } from 'puppeteer-core';
import type { DocumentContext } from '../../page';
import { getElement } from '../general/getElement';
import type { SelectorOrElement } from '../types';

/**
 * Gets parent element of defined element.
 * @param context Page or Frame
 * @param elementOrSelector Element or selector
 *
 * @category Element General
 */
export async function getParent(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<ElementHandle> {
  const element = await getElement(context, elementOrSelector);
  return element.$x('..').then((els) => els[0]);
}
