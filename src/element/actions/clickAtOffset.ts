import { ClickOptions, Page } from 'puppeteer-core';
import { getBoundingBox, Offsets } from '../../boundingBox';
import { getElement } from '../getElement';
import { SelectorOrElement } from '../types';

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
