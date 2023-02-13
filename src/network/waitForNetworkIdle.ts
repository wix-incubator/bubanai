import { wait } from '../waitFor';
import { ACTION_TIMEOUT } from '../settings';
import { Page } from 'puppeteer-core';
import { RequestWaiter } from './requestWaiter';
import { DefaultRequestTypes } from './types';

export class NetworkDriver {
  constructor(private page: Page) {}

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
