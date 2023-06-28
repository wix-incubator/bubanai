import type { ElementHandle } from 'puppeteer-core';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';
import { TestError } from '../../error';
import { waitBySelectorType } from '../utils';

/**
 * Wrapper for waitForSelector.
 * Used only for elements that exist.
 * Throws exception on null, so don't pass {hidden: true} prop inside it.
 * @param context Page or Frame
 * @param selectorOrElement Element or selector
 * @param options SearchElementOptions
 *
 * @category Element General
 */
export async function getElement(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  options?: SearchElementOptions,
): Promise<ElementHandle> {
  // TDB
  if (typeof selectorOrElement !== 'string') {
    return selectorOrElement;
  }

  const element = await waitBySelectorType(context, selectorOrElement, options);
  if (element === null) {
    throw new Error(
      TestError.ElementWithSelectorWasNotFound(selectorOrElement),
    );
  }

  return element;
}
