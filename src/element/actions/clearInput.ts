import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';
import { click } from './click';

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
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
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

  await pageContext.keyboard.press('Home');
  await pageContext.keyboard.down('Shift');
  await pageContext.keyboard.press('End');
  await pageContext.keyboard.up('Shift');
  await pageContext.keyboard.press('Backspace');
}

function getPageContext(context: Page | Frame, page: Page | undefined): Page {
  if (!isFrame(context)) {
    return context as Page;
  }

  if (!page) {
    throw new Error(
      `The page argument should be passed when the Frame is a context`,
    );
  }

  return page;
}

function isFrame(context: Page | Frame): boolean {
  return 'name' in context ? true : false;
}
