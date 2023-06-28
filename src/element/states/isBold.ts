import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import { StyleProperty } from '../types';
import { getComputedStyle } from '../props/getComputedStyle';

/**
 * Checks if element computed font weight is equal 700.
 * @param context Page or Frame
 * @param selectorOrElement selector o ElementHandle
 *
 * @category Element States
 */
export async function isBold(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  return getComputedStyle(
    StyleProperty.FONT_WEIGHT,
    context,
    selectorOrElement,
  ).then((pr) => pr === '700');
}
