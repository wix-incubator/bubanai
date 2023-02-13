import { BoundingBox } from 'puppeteer';

export function getRight(boundingBox: BoundingBox) {
  return boundingBox.x + boundingBox.width;
}
