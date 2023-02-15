import { waitFor } from '../../waitFor';
import { isExpanded } from '../states/isExpanded';
import { ElementHandle } from 'puppeteer-core';
import { DefaultWaitOptions, WaitOptions } from '../../types';

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
