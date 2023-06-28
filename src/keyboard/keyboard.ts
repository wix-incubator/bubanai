import type { Page } from 'puppeteer-core';

import type { KeyboardKeysType } from './types';
import { MetaKeys } from './types';
import { createPromiseChain } from '../collection';

/**
 * Converts keys that are different on platforms
 * @param page
 * @param keys
 *
 * @category Keyboard
 */
async function convertMetaKeys(page: Page, keys: KeyboardKeysType[]) {
  const controlOrCommand = (await page.evaluate(
    () => navigator.userAgent.indexOf('Mac') !== -1,
  ))
    ? 'Meta'
    : 'Control';

  return keys.map((key) => {
    switch (key) {
      case MetaKeys.ControlOrCommand:
        return controlOrCommand;
      case MetaKeys.Alt:
        return 'Alt';
      default:
        return key;
    }
  });
}

/**
 * Driver for manipulations with keyboard.
 *
 * @category Keyboard
 */
export class KeyboardDriver {
  constructor(private readonly page: Page) {}
  private keysToHold: string[] = [];

  /**
   * Holds keys.
   * @param keys
   */
  async hold(keys: KeyboardKeysType[]): Promise<void> {
    if (keys.length === 0) {
      return;
    }

    this.keysToHold = await convertMetaKeys(this.page, keys);

    await createPromiseChain(this.keysToHold, (key) =>
      this.page.keyboard.down(key as any),
    );
  }

  /**
   * Release all keys that were hold.
   */
  async releaseAll(): Promise<void> {
    if (this.keysToHold.length === 0) {
      return;
    }

    const keysToRelease = this.keysToHold;
    this.keysToHold = [];
    await createPromiseChain(keysToRelease.reverse(), (key) =>
      this.page.keyboard.up(key as any),
    );
  }

  /**
   * Hold and execute additional keys while already has been holding some.
   * @param keys
   */
  async execute(keys: KeyboardKeysType[]): Promise<void> {
    if (keys.length === 0) {
      return;
    }

    const convertedKeys = await convertMetaKeys(this.page, keys);
    const downKeys = convertedKeys.slice(0, -1);
    const pressKey = convertedKeys[convertedKeys.length - 1];
    await this.holdAndExecute(downKeys, async () =>
      this.page.keyboard.press(pressKey as any),
    );
  }

  /**
   * Holds keys, makes action, performs key up
   * @param keys Keys array
   * @param action async action function before mouse up
   */
  async holdAndExecute(
    keys: KeyboardKeysType[],
    action: () => Promise<any>,
  ): Promise<void> {
    const convertedKeys = await convertMetaKeys(this.page, keys);

    await createPromiseChain(convertedKeys, (key) =>
      this.page.keyboard.down(key as any),
    );

    await action();

    await createPromiseChain(convertedKeys.reverse(), (key) =>
      this.page.keyboard.up(key as any),
    );
  }
}
