import { getElement } from '../general/getElement';
import type { DocumentContext } from '../../page';
import type { SearchElementOptions, SelectorOrElement } from '../types';
import type { EvaluateFunc } from 'puppeteer-core';

/**
 * Evaluates browser function on element in defined browser context.
 * @param fn Browser function
 * @param context Page or Frame
 * @param selectorOrElement Element or selector
 * @param searchElementOptions SearchElementOptions
 *
 * @example `const outerText = await evaluateOnSelectorOrElement((e) => e.outerText, page, element);`
 *
 * @category Element Actions
 */
export async function evaluateOnSelectorOrElement<T extends EvaluateFunc<any>>(
  fn: T,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
) {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  return context.evaluate(fn, element);
}
