import { DocumentContext } from '../../page';
import { StyleProperty } from '../types';
import { getComputedStyle } from '../getComputedStyle';

export async function isBold(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.FONT_WEIGHT, context, selector).then(
    (pr) => pr === '700',
  );
}
