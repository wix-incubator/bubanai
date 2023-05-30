import { getBottom } from '../../src';

describe('BoundingBox: getBottom()', () => {
  it('should get bottom of a bounding box object', () => {
    const boundingBox = {
      x: 10.5,
      y: 15.7,
      width: 25.9,
      height: 30.2,
    };

    const result = getBottom(boundingBox);

    expect(result).toEqual(boundingBox.y + boundingBox.height);
  });
});
