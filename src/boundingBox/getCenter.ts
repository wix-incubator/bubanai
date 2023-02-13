import { BoundingBox } from '@wix/sled-test-runner';
import { getPointByDimensionDivider } from './getPointByDimensionDivider';
import { Point } from './types';

export const getCenter = (box: BoundingBox): Point =>
  getPointByDimensionDivider(box, 2);
