import { DocumentContext } from '../page';
import { StyleProperty } from './types';
import { getElement } from './getElement';

/**
 * Method returns the computed style property.
 *
 * @category Element General
 *
 * @example `const fontFamily = await getComputedStyle(StyleProperty.FONT_FAMILY, page, '#text_1');`
 */
export async function getComputedStyle(
  property: StyleProperty,
  context: DocumentContext,
  selector: string,
  pseudoElement: string | null = null,
) {
  const _element = await getElement(context, selector);
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
