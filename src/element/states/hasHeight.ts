import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';
import { StyleProperty } from '../types';

export async function hasHeight(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.HEIGHT, context, selector).then(
    (h) => h !== '0px',
  );
}
