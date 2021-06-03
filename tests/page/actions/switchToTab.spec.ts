import { click } from '../../../src/element/actions/click';
import { getText } from '../../../src/element/actions/getText';
import { switchToTab } from '../../../src/page/actions/switchToTab';

describe('Page Actions: switchToTab()', () => {
  it('should switch to the new opened tab', async () => {
    await page.goto('http://the-internet.herokuapp.com/windows');

    await click(page, '[href="/windows/new"]');
    const newPage = await switchToTab(page, 'windows/new');

    const text = await getText(newPage, 'body');
    expect(text).toBe('New Window');
  });
});
