import { Page, Point } from 'puppeteer';

export async function moveToCoordinates(
  page: Page,
  from: Point,
  to: Point,
  continuous?: boolean,
) {
  await page.mouse.move(to.x, from.y, {
    steps: continuous ? Math.abs(to.x - from.x) : 1,
  });
  await page.mouse.move(to.x, to.y, {
    steps: continuous ? Math.abs(to.y - from.y) : 1,
  });
}
