import { EvaluateFn, EvaluateFnReturnType } from 'puppeteer-core';
import { getElement, SearchElementOptions } from './getElement';
import { DocumentContext } from '../page';
import { SelectorOrElement } from './types';

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
