import { ElementHandle, Point, Page } from 'puppeteer';

import { getBoundingBox, getCenter } from '../boundingBox';
import { dragTo } from './dragTo';
import { DragOptions } from './types';

export async function dragElementToPoint(
  page: Page,
  fromElement: ElementHandle,
  to: Point,
  options?: DragOptions,
): Promise<void> {
  const elementBoundingBox = await getBoundingBox(fromElement);
  const from = getCenter(elementBoundingBox);

  await dragTo(page, from, to, options);
}
