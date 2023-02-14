import { DocumentContext } from '../../page';
import { SelectorOrElement, StyleProperty } from '../types';
import { getElementStyleAsRGB } from './getElementStyleAsRGB';

export async function getElementBackgroundColor(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getElementStyleAsRGB(context, element, StyleProperty.BACKGROUND_COLOR);
}
