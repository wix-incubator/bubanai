import type { Page } from 'puppeteer-core';

/**
 * Is used for actions with localStorage.
 */
export class LocalStorageDriver {
  constructor(private readonly page: Page) {}

  /**
   * Sets local storage item and adds it to localStorage.
   * @param key
   * @param value
   */
  async setItem(key: string, value: string) {
    await this.page.evaluate(
      (itemKey, itemValue) => {
        localStorage.setItem(itemKey, itemValue);
      },
      key,
      value,
    );
  }

  /**
   * Disables local storage.
   */
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
