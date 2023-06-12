import { Page } from 'puppeteer-core';
import { getElement } from '../getElement';
import { click } from './click';
import { DocumentContext } from '../../page';
import { isFrame } from '../../frame';
import { clearFocusedInput } from './clearFocusedInput';
import { SearchElementOptions, SelectorOrElement } from '../types';
import { TestError } from '../../error';

/**
 * Method clears the input.
 * Before clearing the value method performs click on the element.
 * After clicking on the input it clears the data inside by selecting all text and deleting it.
 * If a selector was passed then the method tries to find the element and only then clears the value.
 * In order to clear the input a page object is needed, so if the context is `Frame` then an additional `page` argument should be passed.
 *
 * @category Element Actions
 */
export async function clearInput(
  context: DocumentContext,
  selectorOrElement: SelectorOrElement,
  searchElementOptions?: SearchElementOptions,
  page?: Page,
): Promise<void> {
  const pageContext = getPageContext(context, page);

  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  await click(context, element);

  await clearFocusedInput(pageContext);
}

function getPageContext(
  context: DocumentContext,
  page: Page | undefined,
): Page {
  if (!isFrame(context)) {
    return context as Page;
  }

  if (!page) {
    throw new Error(TestError.PageArgumentIsNotPassed());
  }

  return page;
}
