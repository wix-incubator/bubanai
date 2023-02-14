import { Point, Page } from 'puppeteer-core';

import { getBoundingBox, getCenter } from '../boundingBox';
import { dragTo } from './dragTo';
import { DragOptions } from './types';
import { getElement, SelectorOrElement } from '../element';

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
}
