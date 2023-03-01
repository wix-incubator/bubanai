import { Point, Page } from 'puppeteer-core';

import { getBoundingBox, getCenter } from '../boundingBox';
import { dragTo } from './dragTo';
import { DragOptions } from './types';
import { getElement, SelectorOrElement } from '../element';
import { waitForValueToStopChanging } from '../waits';

/**
 * Drag element to coordinates.
 * Start drag point is element center.
 * Guarantees that element position would be stable (do not jump) after drag.
 * @param page Page or Frame
 * @param fromElement Element that should be dragged
 * @param to Target coordinates
 * @param options DragOptions
 *
 * @category Drag
 */
export async function dragElementToPoint(
  page: Page,
  fromElement: SelectorOrElement,
  to: Point,
  options?: DragOptions,
): Promise<void> {
  const targetElement = await getElement(page, fromElement);
  const elementBoundingBox = await getBoundingBox(targetElement);
  const from = getCenter(elementBoundingBox);

  await dragTo(page, from, to, options);
  await waitForValueToStopChanging(() => getBoundingBox(targetElement));
}
