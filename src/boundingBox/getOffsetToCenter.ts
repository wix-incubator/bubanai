import { BoundingBox } from 'puppeteer-core';
import { getCenter } from './getCenter';
import { Offsets } from './types';

/**
 * Returns offsets from center to bounding box borders
 * @param box
 *
 * @category Bounding Box
 */
export const getOffsetToCenter = (box: BoundingBox): Offsets => {
  const { x, y } = getCenter(box);
  return { offsetX: x - box.x, offsetY: y - box.y };
};
