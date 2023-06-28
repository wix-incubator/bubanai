import type { AtLeastTwoValuesArray } from '../../src';
import { getSnugBoundingBox } from '../../src';
import type { BoundingBox } from 'puppeteer-core';

describe('Bounding Box: getSnugBoundingBox()', () => {
  it('should calculate the snug bounding box of multiple bounding boxes', () => {
    const boundingBoxes: AtLeastTwoValuesArray<BoundingBox> = [
      { x: 10, y: 20, width: 100, height: 200 },
      { x: 50, y: 30, width: 150, height: 100 },
      { x: 20, y: 40, width: 120, height: 180 },
    ];

    const leftMost = Math.min(...boundingBoxes.map((box) => box.x));
    const topMost = Math.min(...boundingBoxes.map((box) => box.y));
    const rightMost = Math.max(
      ...boundingBoxes.map((box) => box.x + box.width),
    );
    const bottomMost = Math.max(
      ...boundingBoxes.map((box) => box.y + box.height),
    );

    const result = getSnugBoundingBox(boundingBoxes);

    expect(result).toEqual({
      x: leftMost,
      y: topMost,
      width: rightMost - leftMost,
      height: bottomMost - topMost,
    });
  });
});
