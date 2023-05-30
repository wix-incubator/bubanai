import { getPointByDimensionDivider } from '../../src';

describe('BoundingBox: getPointByDimensionDivider()', () => {
  const box = { x: 10, y: 20, width: 100, height: 200 };

  it('should calculate the point coordinates based on the divider', () => {
    const divider = 3;
    const result = getPointByDimensionDivider(box, divider);

    expect(result).toEqual({ x: 43.333333333333336, y: 86.66666666666667 });
  });

  it('should calculate the point coordinates when the divider is 1', () => {
    const divider = 1;
    const result = getPointByDimensionDivider(box, divider);

    expect(result).toEqual({ x: 110, y: 220 });
  });
});
