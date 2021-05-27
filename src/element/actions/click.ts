import { ClickOptions, Frame, Page } from 'puppeteer';
import { getElement } from '../getElement';

/**
 * @category Element Actions
 */
export async function click(
  context: Page | Frame,
  selector: string,
  options?: ClickOptions,
) {
  // TBD
  const element = await getElement(context, selector);
  await element.click(options);
}
