import type { ClickOptions, Page } from 'puppeteer-core';
import type { Offsets } from '../../boundingBox';
import { getBoundingBox } from '../../boundingBox';
import { getElement } from '../general/getElement';
import type { SelectorOrElement } from '../types';

/**
 * Clicks at a point with offset from element.
 * @param page Page
 * @param element Element or selector
 * @param offsets Offset from top left corner of element
 * @param options ClickOptions
 *
 * @category Element Actions
 */
export async function clickAtOffset(
  page: Page,
  element: SelectorOrElement,
  offsets: Offsets,
  options?: ClickOptions,
) {
  const targetElement = await getElement(page, element);
  const boundingBox = await getBoundingBox(targetElement);
  const clickPoint = {
    x: boundingBox.x + offsets.offsetX,
    y: boundingBox.y + offsets.offsetY,
  };
  await page.mouse.click(clickPoint.x, clickPoint.y, options);
}
