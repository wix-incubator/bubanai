import type { Page } from 'puppeteer-core';

import { KeyboardKeysType, MetaKeys } from './types';
import { createPromiseChain } from '../collection';

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

export class KeyboardDriver {
  constructor(private readonly page: Page) {}
  private keysToHold: string[] = [];

  async hold(keys: KeyboardKeysType[]): Promise<void> {
    if (keys.length === 0) {
      return;
    }

    this.keysToHold = await convertMetaKeys(this.page, keys);

    await createPromiseChain(this.keysToHold, (key) =>
      this.page.keyboard.down(key as any),
    );
  }

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

  async holdAndExecute(
    keys: KeyboardKeysType[],
    action: () => Promise<void>,
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
