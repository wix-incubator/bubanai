import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { getComputedStyle, StyleProperty } from '../getComputedStyle';

/**
 * Verifies if the element visible by checking next conditions:
 * - if the element is absent in DOM then returns `false` at once
 * - if the element computed style property `opacity === '0'` then returns `false`
 * - if the element computed style property `display === 'none'` then returns `false`
 * - if the element computed style property `visibility === 'hidden'` then returns `false`
 * - if the element bounding box value equals to `null` then returns `false`
 * - in other cases it returns `true`
 *
 * @category Element States
 */
export async function isVisible(
  context: Page | Frame,
  selector: string,
): Promise<boolean> {
  const element = await context.$(selector);
  if (element === null) {
    return false;
  }

  const isBoxVisible = await isBoundingBoxVisible(
    element as unknown as ElementHandle,
  );
  const opacity = await getComputedStyle(
    StyleProperty.OPACITY,
    context,
    selector,
  );
  const display = await getComputedStyle(
    StyleProperty.DISPLAY,
    context,
    selector,
  );
  const visibility = await getComputedStyle(
    'StyleProperty.VISIBILITY',
    context,
    selector,
  );

  return (
    visibility !== 'hidden' &&
    display !== 'none' &&
    opacity !== '0' &&
    isBoxVisible
  );
}

async function isBoundingBoxVisible(element: ElementHandle): Promise<boolean> {
  const boundingBox = await element.boundingBox();
  return boundingBox !== null;
}
