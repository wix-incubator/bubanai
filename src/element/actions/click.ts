import { ClickOptions } from 'puppeteer-core';
import { getElement, SearchElementOptions } from '../getElement';
import { isDisabled } from '../states/isDisabled';
import { DocumentContext } from '../../page';
import { SelectorOrElement } from '../types';

/**
 * Click on the provided element.
 * If a selector was passed then the method tries to find the element and only then click on it.
 * The click is available only if the button is not disabled, otherwise the error is thrown.
 *
 * @category Element Actions
 */
export async function click(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
  clickOptions?: ClickOptions,
): Promise<void> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  if (await isDisabled(context, element)) {
    const withSelectorMessage =
      typeof selectorOrElement === 'string'
        ? `with selector '${selectorOrElement}' `
        : '';

    throw new Error(
      `Could not perform a click on an element, the element ${withSelectorMessage}is disabled.`,
    );
  }

  await element.click(clickOptions);
}
