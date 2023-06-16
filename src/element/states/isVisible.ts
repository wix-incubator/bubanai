import { ElementHandle } from 'puppeteer-core';
import { getComputedStyle } from '../getComputedStyle';
import { DocumentContext } from '../../page';
import { SelectorOrElement, StyleProperty } from '../types';
import { elementBySelectorType } from '../utils';

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
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
): Promise<boolean> {
  const element =
    typeof selectorOrElement === 'string'
      ? await elementBySelectorType(context, selectorOrElement)
      : selectorOrElement;
  if (element === null) {
    return false;
  }

  const isBoxVisible = await isBoundingBoxVisible(
    element as unknown as ElementHandle,
  );
  const opacity = await getComputedStyle(
    StyleProperty.OPACITY,
    context,
    selectorOrElement,
  );
  const display = await getComputedStyle(
    StyleProperty.DISPLAY,
    context,
    selectorOrElement,
  );
  const visibility = await getComputedStyle(
    StyleProperty.VISIBILITY,
    context,
    selectorOrElement,
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
