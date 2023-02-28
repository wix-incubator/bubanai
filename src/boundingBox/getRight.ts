import { BoundingBox } from 'puppeteer-core';

/**
 * Returns right border of bounding box
 * @param boundingBox
 */
export function getRight(boundingBox: BoundingBox) {
  return boundingBox.x + boundingBox.width;
}
