import { click, getText, waitForTab } from '../../../src';

describe('Page Actions: waitForTab()', () => {
  it('should switch to the new opened tab', async () => {
    await page.goto('http://the-internet.herokuapp.com/windows');

    await click(page as never, '[href="/windows/new"]');
    const newPage = await waitForTab(browser as never, /.*new.*/);

    const text = await getText(newPage, 'body');
    expect(text).toBe('New Window');
  });
});
