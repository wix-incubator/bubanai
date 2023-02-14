import { StyleProperty } from '../types';
import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';

export async function isItalic(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.FONT_STYLE, context, selector).then(
    (pr) => pr === 'italic',
  );
}
