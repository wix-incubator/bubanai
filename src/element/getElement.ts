import { ElementHandle, Frame, Page } from 'puppeteer';
import { ACTION_TIMEOUT } from '../settings';

export interface SearchElementOptions {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
  wait?: boolean;
}

export async function getElement(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  let element;
  if (options && options.wait === false) {
    element = await context.$(selectorOrElement);
    return element;
  }

  const defaultWaitOptions = {
    visible: true,
    hidden: false,
    timeout: ACTION_TIMEOUT,
  };
  const mergedWaitOptions = { ...defaultWaitOptions, options };
  element = await context.waitForSelector(selectorOrElement, mergedWaitOptions);

  if (element === null) {
    throw new Error(
      `The element by selector ${selectorOrElement} wasn't found.`,
    );
  }

  return element;
}
