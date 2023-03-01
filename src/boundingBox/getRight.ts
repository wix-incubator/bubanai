import { BoundingBox } from 'puppeteer-core';

/**
 * Returns right border of bounding box
 * @param boundingBox
 *
 * @category Bounding Box
 */
export function getRight(boundingBox: BoundingBox) {
  return boundingBox.x + boundingBox.width;
}
