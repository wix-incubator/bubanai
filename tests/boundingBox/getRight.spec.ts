import { getRight } from '../../src';

describe('Bounding Box: getRight()', () => {
  it('should get right coordinates of a bounding box object', () => {
    const boundingBox = {
      x: 10.5,
      y: 15.7,
      width: 25.9,
      height: 30.2,
    };

    const result = getRight(boundingBox);

    expect(result).toEqual(boundingBox.x + boundingBox.width);
  });
});
