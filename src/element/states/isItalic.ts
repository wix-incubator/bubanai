import { StyleProperty } from '../types';
import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';

/**
 * Checks if element computed font style is equal italic.
 * @param context Page or Frame
 * @param selector selector
 *
 * @category Element States
 */
export async function isItalic(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.FONT_STYLE, context, selector).then(
    (pr) => pr === 'italic',
  );
}
