import { Page } from 'puppeteer-core';
import { dragTo } from './dragTo';
import { getBoundingBox, getCenter } from '../boundingBox';
import { waitForValueToStopChanging } from '../waits';
import { getElement, SelectorOrElement } from '../element';
import { DragOptions } from './types';

/**
 * Drags element from it's center to point with offsets from center.
 * Guarantees that element position would be stable (do not jump) after drag.
 * @param page Page or Frame
 * @param element Selector or element
 * @param byX Left offset
 * @param byY Top offset
 * @param options DragOptions
 */
export async function dragElementBy(
  page: Page,
  element: SelectorOrElement,
  byX: number,
  byY: number,
  options?: DragOptions,
) {
  const targetElement = await getElement(page, element);
  const elementBoundingBox = await getBoundingBox(targetElement);
  const from = getCenter(elementBoundingBox);
  const to = { x: from.x + byX, y: from.y + byY };
  await dragTo(page, from, to, options);
  await waitForValueToStopChanging(() => getBoundingBox(targetElement));
}
