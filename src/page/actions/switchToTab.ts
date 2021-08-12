import { Page } from 'puppeteer-core';
import { waitFor, WaitOptions } from '../../waitFor';

/**
 * Method takes all open tabs and iterates through them in order to find the tab with the URL part that was passed.
 * If the tab was found method switches to it using `bringToFront` method and returns the new page context.
 *
 * @category Page Actions
 */
export async function switchToTab(
  page: Page,
  urlPart: string,
  waitOptions?: WaitOptions,
): Promise<Page> {
  const tabFn = async () =>
    (await page.browser().pages()).find((p) => p.url().includes(urlPart));
  const timeoutMessage = `There is a timeout error while waiting for tab with URL part '${urlPart}'`;
  const message = `The tab with URL part '${urlPart}' wasn't found.`;

  await waitFor(
    async () => (await tabFn()) !== undefined,
    waitOptions,
    timeoutMessage,
  );
  const tab = await tabFn();
  if (tab === undefined) {
    throw new Error(message);
  }

  await tab.bringToFront();
  return tab;
}
