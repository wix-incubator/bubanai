import { ElementHandle, Page } from 'puppeteer';
import { dragTo } from './dragTo';
import { getBoundingBox, getCenter } from '../boundingBox';
import { waitForValueToStopChanging } from '../waits';

export async function dragElementBy(
  page: Page,
  element: ElementHandle,
  byX: number,
  byY: number,
  continuous?: boolean,
) {
  const elementBoundingBox = await getBoundingBox(element);
  const from = getCenter(elementBoundingBox);
  const to = { x: from.x + byX, y: from.y + byY };
  await dragTo(page, from, to, { continuous });
  await waitForValueToStopChanging(() => getBoundingBox(element));
}
