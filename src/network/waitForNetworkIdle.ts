import { wait } from '../waitFor';
import { ACTION_TIMEOUT } from '../settings';
import { Page } from 'puppeteer-core';
import { RequestWaiter } from './requestWaiter';
import { DefaultRequestTypes } from './types';

/**
 * Manipulations with network.
 *
 * @category Network
 */
export class NetworkDriver {
  constructor(private page: Page) {}

  /**
   * Waits for request with defined request types not to come to network along some time.
   * If requests are still executed - returns nothing after ACTION_TIMEOUT / 2 seconds.
   * Async function can be passed if needed after which execution no network requests is expected after some time.
   * Function is useful when there is not proper condition to check if action is completed except network server
   * requests stopped executing.
   * Use carefully and be sure to define only needed request types.
   * By default, they are:
   *   'fetch',
   *   'xhr',
   *   'document',
   *   'javascript',
   *   'script',
   * @param options
   */
  async waitForNetworkIdle(options?: {
    action?: () => Promise<any>;
    requestTypes?: string[];
  }) {
    const requestWaiter = new RequestWaiter(
      this.page,
      options?.requestTypes ?? DefaultRequestTypes,
    );
    options?.action ? await options.action() : await wait(2000);
    await Promise.race([
      requestWaiter.waitForAllRequestsToBeFinished(),
      wait(ACTION_TIMEOUT / 2),
    ]);
  }
}
