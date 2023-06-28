import type { DocumentContext } from '../../page';
import { getProperty } from '../props/getProperty';
import type { SelectorOrElement } from '../types';
import { ElementPropertyType } from '../types';
import { getElement } from '../general/getElement';

/**
 * Checks if element has required property.
 * @param context Page or Frame
 * @param selectorOrElement Element or selector
 *
 * @category Element States
 */
export async function isRequired(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
) {
  const element = await getElement(context, selectorOrElement);
  return getProperty(ElementPropertyType.required, context, element).then(
    (r) => !!r,
  );
}
