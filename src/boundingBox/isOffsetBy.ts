import type { BoundingBox } from 'puppeteer-core';

/**
 * Checks that offsets from one bounding box to another is equal expected
 * @param boundingBoxSource
 * @param boundingBoxTarget
 * @param offsets
 *
 * @category Bounding Box
 */
export function isOffsetBy(
  boundingBoxSource: BoundingBox,
  boundingBoxTarget: BoundingBox,
  offsets: Partial<BoundingBox>,
): boolean {
  const isXChangedBy =
    boundingBoxSource.x + (offsets.x || 0) === boundingBoxTarget.x;
  const isYChangedBy =
    boundingBoxSource.y + (offsets.y || 0) === boundingBoxTarget.y;
  const isWidthChangedBy =
    boundingBoxSource.width + (offsets.width || 0) === boundingBoxTarget.width;
  const isHeightChangedBy =
    boundingBoxSource.height + (offsets.height || 0) ===
    boundingBoxTarget.height;

  return isXChangedBy && isYChangedBy && isWidthChangedBy && isHeightChangedBy;
}
