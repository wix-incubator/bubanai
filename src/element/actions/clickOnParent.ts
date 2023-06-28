import type { DocumentContext } from '../../page';
import { getParent } from './getParent';
import type { SelectorOrElement } from '../types';

/**
 * Clicks on parent element of current element
 * @param context Page or Frame
 * @param elementOrSelector Element or selector
 *
 * @category Element Actions
 */
export async function clickOnParent(
  context: DocumentContext,
  elementOrSelector: SelectorOrElement,
): Promise<void> {
  return getParent(context, elementOrSelector).then((p) => p.click());
}
