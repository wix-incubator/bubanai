import { ElementHandle } from 'puppeteer-core';
import { ACTION_TIMEOUT } from '../../settings';
import { getElement } from '../getElement';
import { DocumentContext } from '../../page';
import { SearchElementOptions, SelectorOrElement } from '../types';
import { WaitOptions } from '../../types';

export async function waitForElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
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
