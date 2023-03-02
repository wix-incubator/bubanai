import { waitFor } from '../../waitFor';
import { isExpanded } from '../states/isExpanded';
import { ElementHandle } from 'puppeteer-core';
import { DefaultWaitOptions, WaitOptions } from '../../types';

/**
 * Waits for element to have class 'open'.
 * If expanding element is not assigning this class, this method wouldn't work.
 * @param element Selector or element
 * @param waitOptions WaitOptions
 *
 * @example `await element.click();` <br>
 * `await waitForElementToBeExpanded(element);`
 *
 * @category Element Waits
 */
export function waitForElementToBeExpanded(
  element: ElementHandle,
  waitOptions?: WaitOptions,
) {
  return waitFor(
    () => isExpanded(element),
    waitOptions,
    `Element wasn't expanded after timeout ${
      waitOptions?.timeoutMs || DefaultWaitOptions.timeoutMs
    } s.`,
  );
}
