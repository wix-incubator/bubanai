import type { BoundingBox, ElementHandle } from 'puppeteer-core';
import { TestError } from '../error';

/**
 * Returns element bounding box. If box is null - throws exception.
 * @param element
 *
 * @category Bounding Box
 */
export async function getBoundingBox(
  element: ElementHandle,
): Promise<BoundingBox> {
  const box = await element.boundingBox();
  if (!box) {
    throw new Error(TestError.BoundingBox());
  }
  return box;
}
