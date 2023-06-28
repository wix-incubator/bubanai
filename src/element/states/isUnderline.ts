import type { DocumentContext } from '../../page';
import { getComputedStyle } from '../props/getComputedStyle';
import type { SelectorOrElement } from '../types';
import { StyleProperty } from '../types';

/**
 * Checks if element computed text decoration is equal underline.
 * @param context Page or Frame
 * @param selectorOrElement selector or ElementHandle
 *
 * @category Element States
 */
export async function isUnderline(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  return getComputedStyle(
    StyleProperty.TEXT_DECORATION,
    context,
    selectorOrElement,
  ).then((pr) => pr.includes('underline'));
}
