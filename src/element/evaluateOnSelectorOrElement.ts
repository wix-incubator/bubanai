import {
  ElementHandle,
  EvaluateFn,
  EvaluateFnReturnType,
} from 'puppeteer-core';
import { getElement, SearchElementOptions } from './getElement';
import { DocumentContext } from '../page';

export async function evaluateOnSelectorOrElement<T extends EvaluateFn>(
  fn: T,
  context: DocumentContext,
  selectorOrElement: string | ElementHandle,
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
