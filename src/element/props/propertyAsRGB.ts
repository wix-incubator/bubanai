import { getColorParts } from './getColorParts';

/**
 * Returns style property in {r,g,b} format.
 * If transparent - returns {r:0, g:0, b:0}.
 * If property can't be parsed, returns empty string (be careful, pass only color props inside).
 * @param styleProperty string
 *
 * @category Element Properties
 */
export function propertyAsRGB(styleProperty: string) {
  if (styleProperty === 'transparent') {
    return { r: 0, g: 0, b: 0 };
  }
  const safeValue = styleProperty || '';
  if (safeValue.startsWith('rgb')) {
    const colorParts = getColorParts(safeValue);
    return {
      r: Number((colorParts[0] || '').trim()),
      g: Number((colorParts[1] || '').trim()),
      b: Number((colorParts[2] || '').trim()),
    };
  }
}
