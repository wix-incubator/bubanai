import { DocumentContext } from '../../page';
import { StyleProperty } from '../types';
import { getComputedStyle } from '../getComputedStyle';

/**
 * Checks if element computed font weight is equal 700.
 * @param context Page or Frame
 * @param selector selector
 *
 * @category Element States
 */
export async function isBold(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.FONT_WEIGHT, context, selector).then(
    (pr) => pr === '700',
  );
}
