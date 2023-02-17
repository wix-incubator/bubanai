import { Page, Point } from 'puppeteer-core';
import { dragTo } from './dragTo';
import { DragOptions } from './types';

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
