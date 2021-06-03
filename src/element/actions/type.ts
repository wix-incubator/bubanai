import { ElementHandle, Frame, Page } from 'puppeteer';
import { TYPE_ACTION_DELAY } from '../../settings';
import { getElement, SearchElementOptions } from '../getElement';
import { clearInput } from './clearInput';

export interface TypeOptions {
  delayMs?: number;
  clearInput?: boolean;
}

/**
 * Types a text to the provided element.
 * Before typing the value in the input field it's cleared if not specified otherwise.
 *
 * @category Element Actions
 */
export async function type(
  text: string,
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
  typeOptions?: TypeOptions,
): Promise<void> {
  const defaultOptions = {
    delayMs: TYPE_ACTION_DELAY,
    clearInput: true,
  };
  const mergedTypeOptions = {
    ...defaultOptions,
    ...typeOptions,
  };
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  if (mergedTypeOptions.clearInput) {
    await clearInput(context, element);
  }
  await element.type(text, { delay: mergedTypeOptions.delayMs });
}
