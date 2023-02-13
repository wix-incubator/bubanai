import { BoundingBox } from '@wix/sled-test-runner';

export const getPointByDimensionDivider = (
  box: BoundingBox,
  divider: number,
) => ({
  x: box.x + box.width / divider,
  y: box.y + box.height / divider,
});
