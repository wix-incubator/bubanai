import { Page, Point } from 'puppeteer';
import { dragTo } from './dragTo';

export async function dragBy(
  page: Page,
  from: Point,
  byX: number,
  byY: number,
  options?: {
    continuous?: boolean;
    beforeMouseUpAction?: () => Promise<void>;
    afterMouseUpAction?: () => Promise<void>;
  },
) {
  const to = { x: from.x + byX, y: from.y + byY };
  return dragTo(page, from, to, options);
}
