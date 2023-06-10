import { DocumentContext } from '../../page';
import { getProperty } from '../getProperty';
import { ElementPropertyType, SelectorOrElement } from '../types';
import { getElement } from '../getElement';

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
