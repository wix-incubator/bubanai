import { BoundingBox } from 'puppeteer-core';
import { getCenter } from './getCenter';
import { inRange } from 'lodash';

export function isInCenterOfContainer(
  container: BoundingBox,
  child: BoundingBox,
): boolean {
  const containerCenter = getCenter(container);
  const childCenter = getCenter(child);

  return (
    inRange(childCenter.x, containerCenter.x - 1, containerCenter.x + 1) &&
    inRange(childCenter.y, containerCenter.y - 1, containerCenter.y + 1)
  );
}
