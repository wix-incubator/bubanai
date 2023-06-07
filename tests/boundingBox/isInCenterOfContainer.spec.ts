import { isInCenterOfContainer } from '../../src';

describe('Bounding Box: isInCenterOfContainer()', () => {
  const container = { x: 0, y: 0, width: 100, height: 100 };

  it('should return true if the child bounding box is in the center of the container bounding box', () => {
    const child = { x: 40.99, y: 39.01, width: 20, height: 20 };
    const result = isInCenterOfContainer(container, child);
    expect(result).toBe(true);
  });

  it('should return false if the child bounding box is not in the center of the container bounding box (X axis)', () => {
    const child = { x: 41.01, y: 39.01, width: 20, height: 20 };
    const result = isInCenterOfContainer(container, child);
    expect(result).toBe(false);
  });

  it('should return false if the child bounding box is not in the center of the container bounding box (Y axis)', () => {
    const child = { x: 40.99, y: 38.99, width: 20, height: 20 };
    const result = isInCenterOfContainer(container, child);
    expect(result).toBe(false);
  });
});
