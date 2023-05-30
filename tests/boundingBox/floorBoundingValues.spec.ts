import { floorValues } from '../../src';

describe('BoundingBox: floorValues()', () => {
  it('should floor all values of a bounding box object', () => {
    const boundingBox = {
      x: 10.5,
      y: 15.7,
      width: 25.9,
      height: 30.2,
      right: 36.4,
      bottom: 35.9,
    };

    const result = floorValues(boundingBox);

    expect(result).toEqual({
      x: 10,
      y: 15,
      width: 25,
      height: 30,
      right: 36,
      bottom: 35,
    });
  });
});
