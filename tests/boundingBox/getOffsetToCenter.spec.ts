import { getOffsetToCenter, getCenter } from '../../src';

jest.mock('../../src/boundingBox/getCenter', () => ({
  getCenter: jest.fn(),
}));

describe('Bounding Box: getOffsetToCenter()', () => {
  const box = { x: 10, y: 20, width: 100, height: 200 };
  const centerPoint = { x: 60, y: 120 };

  beforeEach(() => {
    (getCenter as any).mockReturnValue(centerPoint);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct offsets from center to bounding box borders', () => {
    const result = getOffsetToCenter(box);
    expect(getCenter).toHaveBeenCalledWith(box);
    expect(result).toEqual({ offsetX: 50, offsetY: 100 });
  });
});
