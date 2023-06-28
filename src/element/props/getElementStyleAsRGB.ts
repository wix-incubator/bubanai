import type { DocumentContext } from '../../page';
import type { SelectorOrElement, StyleProperty } from '../types';
import { getElementStyle } from './getElementStyle';
import { propertyAsRGB } from './propertyAsRGB';

/**
 * Gets element style property in {r, g, b} format.
 * Use only for color properties.
 * @param context Page or Frame
 * @param element Element or selector
 * @param styleProperty StyleProperty or string
 *
 * @category Element Properties
 */
export async function getElementStyleAsRGB(
  context: DocumentContext,
  element: SelectorOrElement,
  styleProperty: StyleProperty,
) {
  const stylePropertyValue = await getElementStyle(
    context,
    element,
    styleProperty,
  );
  return propertyAsRGB(stylePropertyValue);
}
