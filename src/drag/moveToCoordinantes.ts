import { Page, Point } from 'puppeteer-core';

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
