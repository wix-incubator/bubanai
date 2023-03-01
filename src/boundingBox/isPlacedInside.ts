import { BoundingBox } from 'puppeteer-core';

/**
 * Checks if one bounding box is placed inside another and not gone over the borders
 * @param container
 * @param insideElement
 *
 * @category Bounding Box
 */
export function isPlacedInside(
  container: BoundingBox,
  insideElement: BoundingBox,
): boolean {
  return (
    container.x <= insideElement.x &&
    container.y <= insideElement.y &&
    container.x + container.width >= insideElement.x + insideElement.width &&
    container.y + container.height >= insideElement.y + insideElement.height
  );
}
