import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import { waitForFunctionToBeNull } from '../../waits/waitForFunctionToBeNull';
import { waitBySelectorType } from '../utils';

/**
 * Waits until the element will be not visible.
 *
 * @category Element Waits
 */
export async function waitToBeNotVisible(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  const defaultVisibilityOptions = {
    visible: false,
    hidden: true,
  };
  return typeof selectorOrElement === 'string'
    ? waitBySelectorType(context, selectorOrElement, defaultVisibilityOptions)
    : waitForFunctionToBeNull(() => selectorOrElement.boundingBox());
}
