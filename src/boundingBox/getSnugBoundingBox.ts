import { AtLeastTwoValuesArray } from '../collection/types';
import { BoundingBox } from 'puppeteer';
import { chain } from 'lodash';

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
