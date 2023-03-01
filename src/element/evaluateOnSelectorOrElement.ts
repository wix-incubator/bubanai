import { EvaluateFn, EvaluateFnReturnType } from 'puppeteer-core';
import { getElement } from './getElement';
import { DocumentContext } from '../page';
import { SearchElementOptions, SelectorOrElement } from './types';

/**
 * Evaluates browser function on element in defined browser context.
 * @param fn Browser function
 * @param context Page or Frame
 * @param selectorOrElement Element or selector
 * @param searchElementOptions SearchElementOptions
 *
 * @example const outerText = await evaluateOnSelectorOrElement((e) => e.outerText, page, element);
 *
 * @category Element General
 */
export async function evaluateOnSelectorOrElement<T extends EvaluateFn>(
  fn: T,
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
): Promise<
  EvaluateFnReturnType<T> extends PromiseLike<infer U>
    ? U
    : EvaluateFnReturnType<T>
> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  return await context.evaluate(fn, element);
}
