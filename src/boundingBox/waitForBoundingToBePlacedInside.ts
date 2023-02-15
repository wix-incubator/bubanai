import { BoundingBox } from 'puppeteer-core';
import { waitFor } from '../waitFor';
import { isPlacedInside } from './isPlacedInside';
import { throwTestError } from '../error';
import { WaitOptions } from '../types';

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
      `Bounding ${JSON.stringify(
        await boundingGetter(),
      )} is not placed inside ${JSON.stringify(parentBounding)}`,
      boundingGetter,
    ),
  );
}
