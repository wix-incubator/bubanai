import { DocumentContext } from '../page';

export enum StyleProperty {
  DISPLAY = 'display',
  OPACITY = 'opacity',
  VISIBILITY = 'visibility',
  BACKGROUND_COLOR = 'background-color',
  BACKGROUND_IMAGE = 'background-image',
  HEIGHT = 'height',
  FONT_FAMILY = 'font-family',
  FONT_SIZE = 'font-size',
  FONT_STYLE = 'font-style',
  FONT_WEIGHT = 'font-weight',
  COLOR = 'color',
  FILL = 'fill',
  BORDER_WIDTH = 'border-width',
  BORDER_BOTTOM_WIDTH = 'border-bottom-width',
  TEXT_DECORATION = 'text-decoration',
}

/**
 * Method returns the computed style property.
 * If the style property is absent then it returns `undefined`.
 */
export async function getComputedStyle(
  property: string | StyleProperty,
  context: DocumentContext,
  selector: string,
): Promise<string | null> {
  const result = await context.evaluate(
    (e) => {
      const element = document.querySelector(`${e.selector}`);
      if (!element) {
        throw new Error(`Element with selector ${e.selector} was not found`);
      }
      const computedStyle = window.getComputedStyle(element);
      return computedStyle[e.property];
    },
    { selector, property },
  );

  return result;
}
