import type { Page, Point } from 'puppeteer-core';
import { dragTo } from './dragTo';
import type { DragOptions } from './types';

/**
 * Drags element from point to point with offset by defined coordinates.
 * @param page Page or Frame
 * @param from Coordinates of the drag object
 * @param byX Left offset
 * @param byY Top offset
 * @param options DragOptions
 *
 * @category Drag
 */
export async function dragBy(
  page: Page,
  from: Point,
  byX: number,
  byY: number,
  options?: DragOptions,
) {
  const to = { x: from.x + byX, y: from.y + byY };
  return dragTo(page, from, to, options);
}
