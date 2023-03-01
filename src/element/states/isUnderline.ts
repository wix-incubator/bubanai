import { DocumentContext } from '../../page';
import { getComputedStyle } from '../getComputedStyle';
import { StyleProperty } from '../types';

/**
 * Checks if element computed text decoration is equal underline.
 * @param context Page or Frame
 * @param selector selector
 *
 * @category Element States
 */
export async function isUnderline(context: DocumentContext, selector: string) {
  return getComputedStyle(
    StyleProperty.TEXT_DECORATION,
    context,
    selector,
  ).then((pr) => pr.includes('underline'));
}
