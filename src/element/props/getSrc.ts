import { ElementPropertyType, SelectorOrElement } from '../types';
import { DocumentContext } from '../../page';
import { getProperty } from '../getProperty';

export async function getSrc(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getProperty(ElementPropertyType.src, context, element);
}
