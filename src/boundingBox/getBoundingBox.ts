import { BoundingBox, ElementHandle } from '@wix/sled-test-runner';

export async function getBoundingBox(
  element: ElementHandle,
): Promise<BoundingBox> {
  const box = await element.boundingBox();
  if (!box) {
    throw new Error('Failed to get bounding box');
  }
  return box;
}
