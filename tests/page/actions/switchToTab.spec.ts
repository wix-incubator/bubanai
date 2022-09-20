import { click, getText, switchToTab } from '../../../src';

describe('Page Actions: switchToTab()', () => {
  it('should switch to the new opened tab', async () => {
    await page.goto('http://the-internet.herokuapp.com/windows');

    await click(page as never, '[href="/windows/new"]');
    const newPage = await switchToTab(page as never, 'windows/new');

    const text = await getText(newPage, 'body');
    expect(text).toBe('New Window');
  });
});
