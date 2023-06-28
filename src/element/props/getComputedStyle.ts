import type { DocumentContext } from '../../page';
import type { SelectorOrElement, StyleProperty } from '../types';
import { getElement } from '../general/getElement';

/**
 * Method returns the computed style property.
 *
 * @category Element Properties
 *
 * @example `const fontFamily = await getComputedStyle(StyleProperty.FONT_FAMILY, page, '#text_1');`
 */
export async function getComputedStyle(
  property: StyleProperty,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  pseudoElement: string | null = null,
) {
  const _element = await getElement(context, selectorOrElement);
  return context.evaluate(
    (params, el) => {
      const computedStyle = window.getComputedStyle(el, params.pseudoElement);
      return computedStyle[params.property];
    },
    {
      property,
      pseudoElement,
    },
    _element,
  );
}
