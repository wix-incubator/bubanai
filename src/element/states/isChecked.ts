import type { DocumentContext } from '../../page';
import { getProperty } from '../props/getProperty';
import type { SelectorOrElement } from '../types';
import { ElementPropertyType } from '../types';

/**
 * Checks if element contains checked property.
 * @param context Page or Frame
 * @param element Element or selector
 *
 * @category Element States
 */
export async function isChecked(
  context: DocumentContext,
  element: SelectorOrElement,
) {
  return getProperty(ElementPropertyType.checked, context, element).then(
    (r) => !!r,
  );
}
