import { hexAsRgb } from '../../../src';

describe('Element Properties: hexAsRgb()', () => {
  it('should convert a valid hex color to {r, g, b} format', () => {
    const hexColor = '#FF0000';
    const result = hexAsRgb(hexColor);
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should return null for null input', () => {
    const result = hexAsRgb(null);
    expect(result).toBeNull();
  });

  it('should return null for invalid hex color input', () => {
    const hexColor = 'invalid';
    const result = hexAsRgb(hexColor);
    expect(result).toBeNull();
  });

  it('should return null for hex color without "#" prefix', () => {
    const hexColor = 'FF0000';
    const result = hexAsRgb(hexColor);
    expect(result).toBeNull();
  });
});
