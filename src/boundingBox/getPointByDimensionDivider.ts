import { BoundingBox } from 'puppeteer-core';

/**
 * Returns point that is divided in n times from bounding box bottom right border
 * @param box
 * @param divider
 */
export const getPointByDimensionDivider = (
  box: BoundingBox,
  divider: number,
) => ({
  x: box.x + box.width / divider,
  y: box.y + box.height / divider,
});
