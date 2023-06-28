import type { SelectorOrElement } from '../types';
import { ElementPropertyType } from '../types';
import type { DocumentContext } from '../../page';
import { getProperty } from './getProperty';

/**
 * Gets element src property.
 * @param context Page or Frame
 * @param element Element or selector
 *
 * @category Element Properties
 */
export async function getSrc(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getProperty(ElementPropertyType.src, context, element);
}
