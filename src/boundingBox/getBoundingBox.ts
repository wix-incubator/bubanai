import { BoundingBox, ElementHandle } from 'puppeteer-core';

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
    throw new Error('Failed to get bounding box');
  }
  return box;
}
