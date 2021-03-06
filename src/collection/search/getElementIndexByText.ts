import { ElementHandle, Frame, Page } from 'puppeteer-core';
import { getText } from '../../element/actions/getText';
import { SearchElementOptions } from '../../element/getElement';
import { getElements } from '../../element/getElements';

/**
 * Returns the index of the element in the collection that equals the specified `text`.
 * Text search can be both cases sensitive and insensitive.
 *
 * @category Collection Search
 */
export async function getElementIndexByText(
  text: string,
  context: Page | Frame,
  selectorOrElements: string | ElementHandle[],
  searchElementOptions?: SearchElementOptions,
  ignoreCase?: boolean,
): Promise<number> {
  const elements = await getElements(
    context,
    selectorOrElements,
    searchElementOptions,
  );
  const texts = await Promise.all(
    elements.map((element) => getText(context, element)),
  );

  return ignoreCase
    ? texts.map((item) => item.toLowerCase()).indexOf(text.toLowerCase())
    : texts.indexOf(text);
}
