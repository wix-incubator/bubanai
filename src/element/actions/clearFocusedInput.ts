import { Page } from 'puppeteer-core';

export async function clearFocusedInput(page: Page) {
  await page.keyboard.press('Home');
  await page.keyboard.down('Shift');
  await page.keyboard.press('End');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Backspace');
}
