import { getColorParts } from './getColorParts';

export function propertyAsOpacity(styleProperty: string) {
  if (styleProperty === 'transparent') {
    return 0;
  }

  const safeValue = styleProperty || '';
  if (safeValue.startsWith('rgba')) {
    const colorParts = getColorParts(safeValue);

    return Number(colorParts[3]) * 100;
  }
}
