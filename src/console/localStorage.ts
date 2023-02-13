import type { Page } from 'puppeteer-core';

export class LocalStorageDriver {
  constructor(private readonly page: Page) {}

  async setItem(key: string, value: string) {
    await this.page.evaluate(
      (itemKey, itemValue) => {
        localStorage.setItem(itemKey, itemValue);
      },
      key,
      value,
    );
  }

  async disableLocalStorage() {
    await this.page.evaluate(() => {
      localStorage.getItem = () => {
        throw new Error();
      };
    });

    await this.page.evaluate(() => {
      localStorage.setItem = () => {
        throw new Error();
      };
    });
  }
}
