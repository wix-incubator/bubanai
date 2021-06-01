import { ElementHandle, Frame, Page } from 'puppeteer';
import { getElement, SearchElementOptions } from '../getElement';
import { click } from './click';

/**
 * Method clears the input.
 * Before clearing the value method performs click on the element.
 * After clicking on the input it clears the data inside by selecting all text and deleting it.
 * If a selector was passed then the method tries to find the element and only then clears the value.
 *
 * @category Element Actions
 */
export async function clearInput(
  context: Page | Frame,
  selectorOrElement: string | ElementHandle,
  searchElementOptions?: SearchElementOptions,
): Promise<void> {
  const element = await getElement(
    context,
    selectorOrElement,
    searchElementOptions,
  );

  await click(context, element);

  await page.keyboard.press('Home');
  await page.keyboard.down('Shift');
  await page.keyboard.press('End');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Backspace');
}
