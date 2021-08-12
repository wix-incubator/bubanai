import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { ACTION_TIMEOUT } from '../../settings';
import { WaitOptions } from '../../waitFor';
import { getElement, SearchElementOptions } from '../getElement';

export async function waitForElement(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  defaultVisibilityOptions: SearchElementOptions,
  waitOptions?: WaitOptions,
): Promise<ElementHandle> {
  const timeout =
    waitOptions && waitOptions.timeoutMs
      ? waitOptions.timeoutMs
      : ACTION_TIMEOUT;
  const mergedVisibilityOptions = {
    ...defaultVisibilityOptions,
    timeout,
  };

  return getElement(context, selectorOrElement, mergedVisibilityOptions);
}
