import type { DocumentContext } from '../../page';
import type { SelectorOrElement } from '../types';
import { StyleProperty } from '../types';
import { getElementStyleAsRGB } from './getElementStyleAsRGB';

/**
 * Gets element background color property in {r, g, b} format.
 * @param context Page or Frame
 * @param element Element or selector
 *
 * @category Element Properties
 */
export async function getElementBackgroundColor(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getElementStyleAsRGB(context, element, StyleProperty.BACKGROUND_COLOR);
}
