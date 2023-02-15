import { DocumentContext } from '../../page';
import { getProperty } from '../getProperty';
import { ElementPropertyType, SelectorOrElement } from '../types';

export async function isChecked(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getProperty(ElementPropertyType.checked, context, element).then(
    (r) => !!r,
  );
}
