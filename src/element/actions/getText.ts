import { ElementHandle, Frame, Page } from 'puppeteer';
import { SearchElementOptions, getElement } from '../getElement';

/**
 * Returns the text value of the element.
 * If a selector was passed then the method tries to find the element and only then returns the text value.
 *
 * @category Element Actions
 */
export async function getText(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<string> {
  let element = selectorOrElement;
  if (typeof selectorOrElement === 'string') {
    element = await getElement(
      context,
      selectorOrElement,
      searchElementOptions,
    );
  }

  const text = await context.evaluate(
    (e) => (e.innerText ? e.innerText : e.innerHtml),
    element,
  );
  return text;
}
