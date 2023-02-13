import { BoundingBox } from 'puppeteer-core';

export const getPointByDimensionDivider = (
  box: BoundingBox,
  divider: number,
) => ({
  x: box.x + box.width / divider,
  y: box.y + box.height / divider,
});
