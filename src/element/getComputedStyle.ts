import { DocumentContext } from '../page';
import { StyleProperty } from './types';

/**
 * Method returns the computed style property.
 * If the style property is absent then it returns `undefined`.
 */
export async function getComputedStyle(
  property: StyleProperty,
  context: DocumentContext,
  selector: string,
  pseudoElement: string | null = null,
) {
  const result = await context.evaluate(
    (e) => {
      const element = document.querySelector(`${e.selector}`);
      if (!element) {
        throw new Error(`Element with selector ${e.selector} was not found`);
      }
      const computedStyle = window.getComputedStyle(element, e.pseudoElement);
      return computedStyle[e.property];
    },
    { selector, property, pseudoElement },
  );

  return result;
}
