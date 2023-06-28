import { getComputedStyle } from '../props/getComputedStyle';
import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import { StyleProperty } from '../types';

/**
 * Checks if element computed height doesn't equal 0px.
 * @param context Page or Frame
 * @param selectorOrElement selector or ELementHandle
 *
 * @category Element States
 */
export async function hasHeight(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  return getComputedStyle(
    StyleProperty.HEIGHT,
    context,
    selectorOrElement,
  ).then((h) => h !== '0px');
}
