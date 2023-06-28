import { isPlacedInside } from '../../src';
import type { BoundingBox } from 'puppeteer-core';

describe('Bounding Box: isPlacedInside()', () => {
  const container: BoundingBox = { x: 10, y: 10, width: 100, height: 100 };

  it('should return true if the inside element is completely placed inside the container', () => {
    const insideElement: BoundingBox = { x: 20, y: 20, width: 50, height: 50 };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(true);
  });

  it('should return false if the inside element is partially outside the container on the left side', () => {
    const insideElement: BoundingBox = { x: 5, y: 20, width: 50, height: 50 };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(false);
  });

  it('should return false if the inside element is partially outside the container on the top side', () => {
    const insideElement: BoundingBox = { x: 20, y: 5, width: 50, height: 50 };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(false);
  });

  it('should return false if the inside element is partially outside the container on the right side', () => {
    const insideElement: BoundingBox = { x: 90, y: 20, width: 50, height: 50 };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(false);
  });

  it('should return false if the inside element is partially outside the container on the bottom side', () => {
    const insideElement: BoundingBox = { x: 20, y: 90, width: 50, height: 50 };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(false);
  });

  it('should return false if the inside element is completely outside the container', () => {
    const insideElement: BoundingBox = {
      x: 120,
      y: 120,
      width: 50,
      height: 50,
    };
    const result = isPlacedInside(container, insideElement);
    expect(result).toBe(false);
  });
});
