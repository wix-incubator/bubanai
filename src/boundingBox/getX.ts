import { ElementHandle } from 'puppeteer';
import { getBoundingBox } from './getBoundingBox';

export async function getX(element: ElementHandle) {
  return getBoundingBox(element).then(({ x }) => x);
}
