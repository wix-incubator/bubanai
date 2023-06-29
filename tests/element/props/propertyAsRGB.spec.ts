import { propertyAsRGB } from '../../../src';

describe('Element Properties: propertyAsRGB()', () => {
  it('should return { r: 0, g: 0, b: 0 } for "transparent" style property', () => {
    const result = propertyAsRGB('transparent');
    expect(result).toEqual({ r: 0, g: 0, b: 0 });
  });

  it('should return the color parts in { r, g, b } format for valid "rgb" style property', () => {
    const result = propertyAsRGB('rgb(255, 0, 0)');
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should return the color parts in { r, g, b } format for valid "rgba" style property', () => {
    const result = propertyAsRGB('rgba(255, 0, 0, 0)');
    expect(result).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should return undefined for an invalid style property', () => {
    const result = propertyAsRGB('invalid');
    expect(result).toBeUndefined();
  });

  it('should handle leading/trailing spaces in the style property', () => {
    const result = propertyAsRGB('  rgb(  0, 128 , 255 )  ');
    expect(result).toEqual({ r: 0, g: 128, b: 255 });
  });

  it('should return zero rgb object for invalid rgb property', () => {
    const result = propertyAsRGB('rgb1,2,3');
    expect(result).toEqual({ r: 0, g: 0, b: 0 });
  });
});
