import { Page, Point } from 'puppeteer-core';
import { DragOptions } from './types';
import { moveToCoordinates } from './moveToCoordinantes';
import { wait } from '../waitFor';

/**
 * Executes drag from point to point.
 * Doesn't guarantee that drag entity location would be stable after drag.
 * @param page Page or Frame
 * @param from Point from where drag is executed
 * @param to Target point
 * @param options DragOptions
 *
 * @category Drag
 */
export async function dragTo(
  page: Page,
  from: Point,
  to: Point,
  options: DragOptions = {},
) {
  const {
    continuous,
    tempSteps,
    beforeMouseUpAction,
    afterMouseUpAction,
    steps,
  } = options;
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await wait(10);

  let tempPoint = from;

  if (tempSteps) {
    for (const step of tempSteps) {
      const { point, action } = step;
      await moveToCoordinates(page, tempPoint, point, continuous, steps);
      action ? await action() : await wait(100);
      tempPoint = point;
    }
  }
  await moveToCoordinates(page, tempPoint, to, continuous, steps);

  beforeMouseUpAction ? await beforeMouseUpAction() : await wait(300);
  await page.mouse.up();
  afterMouseUpAction && (await afterMouseUpAction());
}
