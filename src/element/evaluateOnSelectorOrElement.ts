import { ElementHandle, EvaluateFn, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from './getElement';

export async function evaluateOnSelectorOrElement(
  fn: EvaluateFn<any>,
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
) {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  return await context.evaluate(fn, element);
}
