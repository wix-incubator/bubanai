import { AtLeastTwoValuesArray } from '../collection/types';
import { BoundingBox } from 'puppeteer-core';
import { chain } from 'lodash';

/**
 * Returns bounding box of two elements, where left top border is their coordinates minimum and
 * right bottom border is their coordinates maximum.
 * Is useful in cases like selection of several elements and checking which area is selected.
 * @param boundingBoxes 2+ bounding boxes
 */
export function getSnugBoundingBox(
  boundingBoxes: AtLeastTwoValuesArray<BoundingBox>,
): BoundingBox {
  const leftMost = chain(boundingBoxes).map('x').min().value();
  const topMost = chain(boundingBoxes).map('y').min().value();
  const rightMost = chain(boundingBoxes)
    .map((v) => v.x + v.width)
    .max()
    .value();
  const bottomMost = chain(boundingBoxes)
    .map((v) => v.y + v.height)
    .max()
    .value();

  return {
    x: leftMost,
    y: topMost,
    width: rightMost - leftMost,
    height: bottomMost - topMost,
  };
}
