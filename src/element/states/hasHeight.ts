import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';
import { StyleProperty } from '../types';

/**
 * Checks if element computed height doesn't equal 0px.
 * @param context Page or Frame
 * @param selector selector
 *
 * @category Element States
 */
export async function hasHeight(context: DocumentContext, selector: string) {
  return getComputedStyle(StyleProperty.HEIGHT, context, selector).then(
    (h) => h !== '0px',
  );
}
