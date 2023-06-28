import type { BoundingBox, Point } from 'puppeteer-core';
import { getPointByDimensionDivider } from './getPointByDimensionDivider';

/**
 * Returns center point of bounding box
 * @param box
 *
 * @category Bounding Box
 */
export const getCenter = (box: BoundingBox): Point =>
  getPointByDimensionDivider(box, 2);
