import { ElementHandle } from 'puppeteer-core';
import { getBoundingBox } from './getBoundingBox';

export async function getX(element: ElementHandle) {
  return getBoundingBox(element).then(({ x }) => x);
}
