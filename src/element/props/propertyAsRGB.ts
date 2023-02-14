import { getColorParts } from './getColorParts';

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
