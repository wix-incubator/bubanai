import { ElementHandle } from 'puppeteer-core';
import { getBoundingBox } from './getBoundingBox';

export async function getY(element: ElementHandle) {
  return getBoundingBox(element).then((box) => box.y);
}
