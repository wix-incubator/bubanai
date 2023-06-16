import { SelectorOrElement, StyleProperty } from '../types';
import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';

/**
 * Checks if element computed font style is equal italic.
 * @param context Page or Frame
 * @param selectorOrElement selector or Element
 *
 * @category Element States
 */
export async function isItalic(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  return getComputedStyle(
    StyleProperty.FONT_STYLE,
    context,
    selectorOrElement,
  ).then((pr) => pr === 'italic');
}
