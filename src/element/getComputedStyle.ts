import { DocumentContext } from '../page';
import { StyleProperty } from './types';
import { TestError } from '../error';

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
  return context.evaluate(
    (e) => {
      const element = document.querySelector(`${e.selector}`);
      if (!element) {
        throw new Error(e.error);
      }
      const computedStyle = window.getComputedStyle(element, e.pseudoElement);
      return computedStyle[e.property];
    },
    {
      selector,
      property,
      pseudoElement,
      error: TestError.ElementWithSelectorWasNotFound(selector),
    },
  );
}
