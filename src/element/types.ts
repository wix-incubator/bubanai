import { ElementHandle, WaitForSelectorOptions } from 'puppeteer-core';

export const StyleProperty = {
  BACKGROUND_COLOR: 'background-color',
  BACKGROUND_IMAGE: 'background-image',
  HEIGHT: 'height',
  FONT_FAMILY: 'font-family',
  GRID_AREA: 'grid-area',
  GRID_ROW_START: 'grid-row-start',
  GRID_ROW_END: 'grid-row-end',
  GRID_COLUMN_START: 'grid-column-start',
  GRID_COLUMN_END: 'grid-column-end',
  FONT_SIZE: 'font-size',
  FONT_STYLE: 'font-style',
  COLOR: 'color',
  FILL: 'fill',
  BORDER_WIDTH: 'border-width',
  BORDER_BOTTOM_WIDTH: 'border-bottom-width',
  BORDER_TOP_WIDTH: 'border-top-width',
  BORDER_RIGHT_WIDTH: 'border-right-width',
  BORDER_LEFT_WIDTH: 'border-left-width',
  DISPLAY: 'display',
  OPACITY: 'opacity',
  FONT_WEIGHT: 'font-weight',
  TEXT_DECORATION: 'text-decoration',
  TEXT_ALIGN: 'text-align',
  ORDER: 'order',
  MARGIN_TOP: 'margin-top',
  MARGIN_BOTTOM: 'margin-bottom',
  JUSTIFY_CONTENT: 'justifyContent',
  PADDING_TOP: 'padding-top',
  PADDING_BOTTOM: 'padding-bottom',
  PADDING_LEFT: 'padding-left',
  PADDING_RIGHT: 'padding-right',
  ALIGN_SELF: 'align-self',
  JUSTIFY_SELF: 'justify-self',
  CSS_TEXT: 'cssText',
  VISIBILITY: 'visibility',
} as const;

export type StyleProperty =
  | typeof StyleProperty[keyof typeof StyleProperty]
  | string;

export type ElementOptions = Omit<WaitForSelectorOptions, 'root'>;

export const ElementPropertyType = {
  checked: 'checked',
  value: 'value',
  disabled: 'disabled',
  src: 'src',
  id: 'id',
  required: 'required',
  innerText: 'innerText',
  class: 'class',
} as const;

export type ElementPropertyType =
  | typeof ElementPropertyType[keyof typeof ElementPropertyType]
  | string;

export type SelectorOrElement = ElementHandle | string;

export type SelectorOrElements = ElementHandle[] | string;

/**
 * Checks if selector is XPath selector
 *
 * @category Selectors
 */
export function isXpath(selector: string) {
  const xpathValidation = new RegExp('^[.]*//[*a-z]+[\\[].*[\\]].*');
  return selector.match(xpathValidation);
}

export interface SearchElementOptions {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
}

export interface SearchElementsOptions extends SearchElementOptions {
  shouldBeNotEmpty?: boolean;
}
