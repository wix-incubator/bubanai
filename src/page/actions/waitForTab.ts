import type { Browser, Page, WaitForTargetOptions } from 'puppeteer-core';
import type { StringOrRegExp } from '../../types';
import { TestError } from '../../error';

/**
 * Method waits for tab with url part or url is opened and brings it to front.
 * If tab does not exist - throws an exception.
 *
 * @category Page Actions
 */
export async function waitForTab(
  browser: Browser,
  partialUrlOrUrlPattern: StringOrRegExp,
  options?: WaitForTargetOptions,
): Promise<Page> {
  const targetMatch = await browser.waitForTarget(
    (target: { url: () => string }) =>
      typeof partialUrlOrUrlPattern === 'string'
        ? target.url().includes(partialUrlOrUrlPattern)
        : !!target.url().match(partialUrlOrUrlPattern),
    options,
  );

  if (!targetMatch) {
    throw new Error(TestError.TabIsNotFound(partialUrlOrUrlPattern));
  }
  const result = await targetMatch.page();
  if (!result) {
    throw new Error(TestError.FailedToInitializePage(partialUrlOrUrlPattern));
  }
  await result.bringToFront();
  return result;
}
