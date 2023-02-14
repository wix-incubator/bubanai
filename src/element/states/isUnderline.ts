import { DocumentContext } from '../../page';
import { getComputedStyle } from '../getComputedStyle';
import { StyleProperty } from '../types';

export async function isUnderline(context: DocumentContext, selector: string) {
  return getComputedStyle(
    StyleProperty.TEXT_DECORATION,
    context,
    selector,
  ).then((pr) => pr.includes('underline'));
}
