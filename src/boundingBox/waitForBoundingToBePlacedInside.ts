import { BoundingBox } from 'puppeteer-core';
import { waitFor } from '../waitFor';
import { isPlacedInside } from './isPlacedInside';
import { TestError, throwTestError } from '../error';
import { WaitOptions } from '../types';

/**
 * Waits for bounding box to be placed inside another and not go beyond the borders.
 * @param boundingGetter Async function that returns bounding box that should be placed inside parent
 * @param parentBounding Parent bounding box
 * @param waitOptions WaitOptions
 *
 * @category Bounding Box
 */
export function waitForBoundingToBePlacedInside(
  boundingGetter: () => Promise<BoundingBox>,
  parentBounding: BoundingBox,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => boundingGetter().then((b) => isPlacedInside(parentBounding, b)),
    waitOptions,
  ).catch(async () =>
    throwTestError(
      await TestError.BoundingIsNotPlacedInside(boundingGetter, parentBounding),
      boundingGetter,
    ),
  );
}
