import { getCenter, getPointByDimensionDivider } from '../../src';

jest.mock('../../src/boundingBox/getPointByDimensionDivider', () => ({
  getPointByDimensionDivider: jest.fn(),
}));

describe('BoundingBox: getCenter()', () => {
  const box = { x: 10, y: 20, width: 100, height: 200 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getPointByDimensionDivider with the box and a divider of 2', () => {
    getCenter(box);

    expect(getPointByDimensionDivider).toHaveBeenCalledWith(box, 2);
  });
});
