import { isOffsetBy } from '../../src';
import { BoundingBox } from 'puppeteer-core';

describe('Bounding Box: isOffsetBy()', () => {
  const source: BoundingBox = { x: 10, y: 10, width: 100, height: 100 };
  const target: BoundingBox = { x: 20, y: 20, width: 120, height: 120 };

  it('should return true if offsets match the changes in the target bounding box', () => {
    const offsets = { x: 10, y: 10, width: 20, height: 20 };
    const result = isOffsetBy(source, target, offsets);
    expect(result).toBe(true);
  });

  it('should return true if some offsets are missing and the changes in the target bounding box are still correct', () => {
    const customTarget = {
      x: source.x,
      y: target.y,
      width: source.width,
      height: target.height,
    };
    const offsets = { y: 10, height: 20 };
    const result = isOffsetBy(source, customTarget, offsets);
    expect(result).toBe(true);
  });

  it('should return false if the offsets do not match the changes in the target bounding box (X prop)', () => {
    const offsets = { x: 9, y: 10, width: 20, height: 20 };
    const result = isOffsetBy(source, target, offsets);
    expect(result).toBe(false);
  });

  it('should return false if the offsets do not match the changes in the target bounding box (width prop)', () => {
    const offsets = { x: 10, y: 10, width: 21, height: 20 };
    const result = isOffsetBy(source, target, offsets);
    expect(result).toBe(false);
  });

  it(`should return false if the offsets do not match the changes in the target bounding box
      (one prop is missing and offset is not 0)`, () => {
    const offsets = { x: 10, y: 10, width: 21 };
    const result = isOffsetBy(source, target, offsets);
    expect(result).toBe(false);
  });
});
