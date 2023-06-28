import type { Page, Point } from 'puppeteer-core';

/**
 * Drag from point to point.
 * Generic function that drag utils are using.
 * Strongly recommended not use it directly, but to use its wrappers.
 * Drags element first by horizontally X, then vertically by Y.
 * @param page Page or Frame
 * @param from Point from which drag is executed
 * @param to Target point
 * @param continuous if enabled - drag will be executed pixel by pixel number of times
 * which equal drag distance if steps are not defined. If steps are defined - dragDistance / steps.
 * If not enabled - would be dragged in 1 step per axis.
 * @param steps Amount of steps by which drag would be executed
 *
 * @category Drag
 */
export async function moveToCoordinates(
  page: Page,
  from: Point,
  to: Point,
  continuous?: boolean,
  steps?: number,
) {
  await page.mouse.move(to.x, from.y, {
    steps: continuous ? steps ?? Math.abs(to.x - from.x) : steps ?? 1,
  });
  await page.mouse.move(to.x, to.y, {
    steps: continuous ? steps ?? Math.abs(to.y - from.y) : steps ?? 1,
  });
}
