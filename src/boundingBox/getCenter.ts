import { BoundingBox, Point } from 'puppeteer';
import { getPointByDimensionDivider } from './getPointByDimensionDivider';

export const getCenter = (box: BoundingBox): Point =>
  getPointByDimensionDivider(box, 2);
