import { ElementHandle } from 'puppeteer-core';
import { getBoundingBox } from './getBoundingBox';

/**
 * Returns left border coordinates of bounding box
 * @param element
 *
 * @category Bounding Box
 */
export async function getX(element: ElementHandle) {
  return getBoundingBox(element).then(({ x }) => x);
}
