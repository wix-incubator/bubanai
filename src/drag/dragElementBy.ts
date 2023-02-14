import { Page } from 'puppeteer-core';
import { dragTo } from './dragTo';
import { getBoundingBox, getCenter } from '../boundingBox';
import { waitForValueToStopChanging } from '../waits';
import { getElement, SelectorOrElement } from '../element';

export async function dragElementBy(
  page: Page,
  element: SelectorOrElement,
  byX: number,
  byY: number,
  continuous?: boolean,
) {
  const targetElement = await getElement(page, element);
  const elementBoundingBox = await getBoundingBox(targetElement);
  const from = getCenter(elementBoundingBox);
  const to = { x: from.x + byX, y: from.y + byY };
  await dragTo(page, from, to, { continuous });
  await waitForValueToStopChanging(() => getBoundingBox(targetElement));
}
