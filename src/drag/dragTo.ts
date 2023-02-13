import { Page, Point } from 'puppeteer-core';
import { DragOptions } from './types';
import { moveToCoordinates } from './moveToCoordinantes';
import { wait } from '../waitFor';

export async function dragTo(
  page: Page,
  from: Point,
  to: Point,
  options: DragOptions = {},
) {
  const { continuous, tempSteps, beforeMouseUpAction, afterMouseUpAction } =
    options;
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await wait(10);

  let tempPoint = from;

  if (tempSteps) {
    for (const step of tempSteps) {
      const { point, action } = step;
      await moveToCoordinates(page, tempPoint, point, continuous);
      action ? await action() : await wait(100);
      tempPoint = point;
    }
  }
  await moveToCoordinates(page, tempPoint, to, continuous);

  beforeMouseUpAction ? await beforeMouseUpAction() : await wait(300);
  await page.mouse.up();
  afterMouseUpAction && (await afterMouseUpAction());
}
