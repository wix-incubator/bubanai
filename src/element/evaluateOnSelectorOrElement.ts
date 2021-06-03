import {
  ElementHandle,
  EvaluateFn,
  EvaluateFnReturnType,
  Frame,
  Page,
  UnwrapPromiseLike,
} from 'puppeteer';
import { getElement, SearchElementOptions } from './getElement';

export async function evaluateOnSelectorOrElement<T extends EvaluateFn>(
  fn: T,
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<UnwrapPromiseLike<EvaluateFnReturnType<T>>> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  return await context.evaluate(fn, element);
}
