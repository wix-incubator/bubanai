import { BoundingBox } from 'puppeteer';
import { getPointByDimensionDivider } from './getPointByDimensionDivider';
import { Point } from './types';

export const getCenter = (box: BoundingBox): Point =>
  getPointByDimensionDivider(box, 2);
