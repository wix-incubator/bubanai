import { getColorParts } from './getColorParts';

/**
 * Returns style property as opacity.
 * Only for transparent / {r,g,b,a} values.
 * If property can't be parsed, returns empty string.
 * @param styleProperty string
 *
 * @category Element Properties
 */
export function propertyAsOpacity(styleProperty: string) {
  if (styleProperty === 'transparent') {
    return 0;
  }

  const safeValue = styleProperty || '';
  if (safeValue.trim().startsWith('rgba')) {
    const colorParts = getColorParts(safeValue);

    return Number(colorParts[3]) * 100;
  }
}
