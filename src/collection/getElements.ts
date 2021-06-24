import { ElementHandle, Frame, Page } from 'puppeteer';
import { ACTION_TIMEOUT } from '../settings';
import { SearchElementOptions } from '../element/getElement';

/**
 * Returns an array of the elements based on the provided selector.
 * Before retrieving the elements there is a wait function that checks the availability of at least one element if `wait !== false`.
 */
export async function getElements(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle[],
  options?: SearchElementOptions,
): Promise<ElementHandle[]> {
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  let elements;
  if (options && options.wait === false) {
    elements = await context.$(selectorOrElement);
    return elements;
  }

  const defaultWaitOptions = {
    visible: true,
    hidden: false,
    timeout: ACTION_TIMEOUT,
  };
  const mergedWaitOptions = { ...defaultWaitOptions, ...options };
  await context.waitForSelector(selectorOrElement, mergedWaitOptions);
  elements = await context.$$(selectorOrElement);

  if (elements.length === 0) {
    throw new Error(
      `There are no elements with selector ${selectorOrElement}.`,
    );
  }

  return elements;
}
