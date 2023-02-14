import { SelectorOrElement, StyleProperty } from '../types';
import { DocumentContext } from '../../page';
import { getElement } from '../getElement';

export async function getElementStyle(
  context: DocumentContext,
  element: SelectorOrElement,
  styleProperty: StyleProperty,
): Promise<string> {
  const targetElement = await getElement(context, element);
  return context.evaluate(
    (e, stylePropName) => e.style[stylePropName],
    targetElement,
    styleProperty,
  );
}
