import { DocumentContext } from '../../page';
import { SelectorOrElement, StyleProperty } from '../types';
import { getElementStyle } from './getElementStyle';
import { propertyAsRGB } from './propertyAsRGB';

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
