import { BoundingBox } from 'puppeteer-core';

/**
 * Returns bottom border of bounding box
 * @param boundingBox
 */
export function getBottom(boundingBox: BoundingBox) {
  return boundingBox.y + boundingBox.height;
}
