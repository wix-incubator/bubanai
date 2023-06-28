import type { LoDashStatic } from 'lodash';

import type { ElementHandle } from 'puppeteer-core';
import type { DocumentContext } from '../page';
import { wait } from '../waitFor';
import { DefaultWaitOptions } from '../types';
import { TestError } from '../error';
import { getElement } from '../element/general/getElement';

const animationProperties = {
  boundingClientRect: ['top', 'left', 'width', 'height'],
  computedStyles: ['opacity'],
};

const waitForAnimationPageFunc = (
  selector: string,
  properties: any,
  error: string,
) =>
  new Promise<void>((resolve) => {
    const getDomElement = () => {
      const domElement = document.querySelector(selector);
      if (!domElement) {
        throw new Error(error);
      }
      return domElement;
    };
    const getBoundingClientRect = () =>
      lodash.pick(
        getDomElement().getBoundingClientRect(),
        properties.boundingClientRect,
      );
    const getComputedStyles = () =>
      lodash.pick(
        window.getComputedStyle(getDomElement()),
        properties.computedStyles,
      );

    const interval = 500;
    const lodash: LoDashStatic = (window as any)._;

    let lastChanged = performance.now();
    let lastBoundingClientRect = getBoundingClientRect();
    let lastComputedStyles = getComputedStyles();

    const checkForChanges = () => {
      setTimeout(() => {
        const boundingClientRect = getBoundingClientRect();
        if (!lodash.isEqual(boundingClientRect, lastBoundingClientRect)) {
          lastChanged = performance.now();
          lastBoundingClientRect = boundingClientRect;
          return checkForChanges();
        }

        const computedStyles = getComputedStyles();
        if (!lodash.isEqual(computedStyles, lastComputedStyles)) {
          lastChanged = performance.now();
          lastComputedStyles = computedStyles;
          return checkForChanges();
        }

        const timeSinceLastChange = performance.now() - lastChanged;
        if (timeSinceLastChange > 2 * interval) {
          resolve();
        } else {
          checkForChanges();
        }
      }, interval);
    };

    checkForChanges();
  });

/**
 * Waits for element animation to stop happening.
 * Checks that bounding and opacity computed styles are not changed during 1 second.
 * If they changed - repeats cycle.
 * If animation is still happened during killTimeout or ACTION_TIMEOUT - returns.
 * Function returns ElementHandle.
 * @param context Page or Frame
 * @param selector Selector
 * @param options timeout when node would be killed if animation is still happened
 *
 * @category Waiters
 */
export async function waitForAnimation(
  context: DocumentContext,
  selector: string,
  options?: { killTimeout?: number },
): Promise<ElementHandle> {
  const result = await getElement(context, selector);
  await Promise.race([
    context.evaluate(
      waitForAnimationPageFunc,
      selector,
      animationProperties,
      TestError.ElementWithSelectorWasNotFound(selector),
    ),
    wait(options?.killTimeout ?? DefaultWaitOptions.timeoutMs),
  ]);
  return result as ElementHandle<Element>;
}
