import { BoundingBox, ElementHandle } from 'puppeteer';

export async function getBoundingBox(
  element: ElementHandle,
): Promise<BoundingBox> {
  const box = await element.boundingBox();
  if (!box) {
    throw new Error('Failed to get bounding box');
  }
  return box;
}
