import { propertyAsOpacity } from '../../../src';

describe('Element Properties: propertyAsOpacity()', () => {
  it('should return 0 for "transparent" style property', () => {
    const result = propertyAsOpacity('transparent');
    expect(result).toBe(0);
  });

  it('should return the opacity value as a number for valid "rgba" style property', () => {
    const result = propertyAsOpacity('rgba(255, 0, 0, 0.5)');
    expect(result).toBe(50);
  });

  it('should return undefined for an rgb style property', () => {
    const result = propertyAsOpacity('rgb(0, 50, 20');
    expect(result).toBeUndefined();
  });

  it('should handle leading/trailing spaces in the style property', () => {
    const result = propertyAsOpacity('  rgba(  0, 128 , 255 , 0.75)  ');
    expect(result).toBe(75);
  });
});
