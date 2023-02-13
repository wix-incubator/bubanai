import { BoundingBox } from 'puppeteer-core';

export function getBottom(boundingBox: BoundingBox) {
  return boundingBox.y + boundingBox.height;
}
