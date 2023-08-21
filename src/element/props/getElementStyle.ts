import type { SelectorOrElement, StyleProperty } from '../types';
import type { DocumentContext } from '../../page';
import { getElement } from '../general/getElement';

/**
 * Gets element style property.
 * @param context Page or Frame
 * @param element Element or selector
 * @param styleProperty StyleProperty or string
 *
 * @category Element Properties
 */
export async function getElementStyle(
  context: DocumentContext,
  element: SelectorOrElement,
  styleProperty: StyleProperty,
): Promise<string> {
  const targetElement = await getElement(context, element);
  return context.evaluate(
    (e, stylePropName) => e['style'][stylePropName],
    targetElement,
    styleProperty,
  );
}
