import { BoundingBox } from 'puppeteer-core';

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
