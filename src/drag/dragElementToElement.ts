import { Page } from 'puppeteer-core';

import { getBoundingBox, getCenter } from '../boundingBox';
import { dragTo } from './dragTo';
import { DragOptions } from './types';
import { waitForValueToStopChanging } from '../waits';
import { getElement, SelectorOrElement } from '../element';

/**
 * Drags element to the center of another element.
 * Guarantees that element position would be stable (do not jump) after drag.
 * @param page Page or Frame
 * @param fromElement Element that should be dragged
 * @param toElement Target element
 * @param dragOptions Drag options
 *
 * @category Drag
 */
export async function dragElementToElement(
  page: Page,
  fromElement: SelectorOrElement,
  toElement: SelectorOrElement,
  dragOptions?: DragOptions,
): Promise<void> {
  const targetFromElement = await getElement(page, fromElement);
  let elementBoundingBox = await getBoundingBox(targetFromElement);
  const from = getCenter(elementBoundingBox);

  const targetToElement = await getElement(page, toElement);
  elementBoundingBox = await getBoundingBox(targetToElement);
  const to = getCenter(elementBoundingBox);

  await dragTo(page, from, to, dragOptions);
  await waitForValueToStopChanging(() => getBoundingBox(targetFromElement));
}
