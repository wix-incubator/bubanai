import { BoundingBox } from 'puppeteer';
import { getCenter } from './getCenter';
import { Offsets } from './types';

export const getOffsetToCenter = (box: BoundingBox): Offsets => {
  const { x, y } = getCenter(box);
  return { offsetX: x - box.x, offsetY: y - box.y };
};
