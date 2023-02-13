import { BoundingBox } from 'puppeteer';

export function getBottom(boundingBox: BoundingBox) {
  return boundingBox.y + boundingBox.height;
}
