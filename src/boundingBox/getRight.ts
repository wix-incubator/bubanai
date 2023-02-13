import { BoundingBox } from 'puppeteer-core';

export function getRight(boundingBox: BoundingBox) {
  return boundingBox.x + boundingBox.width;
}
