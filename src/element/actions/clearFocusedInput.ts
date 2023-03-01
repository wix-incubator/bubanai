import { Page } from 'puppeteer-core';

/**
 * Clears text from focuses input via keyboard hotkeys.
 * @param page Page
 *
 * @category Element Actions
 */
export async function clearFocusedInput(page: Page) {
  await page.keyboard.press('Home');
  await page.keyboard.down('Shift');
  await page.keyboard.press('End');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Backspace');
}
