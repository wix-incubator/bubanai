import { hover, isVisible } from '../../../src';

describe('Element Actions: hover()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/hovers');
  });

  it('should type the value to the TinyMCE WYSIWYG Editor', async () => {
    const imgSelector = '[src="/img/avatar-blank.jpg"]';
    const profileLink = '[href="/users/1"]';

    expect(await isVisible(page as never, profileLink)).toBeFalsy();

    await hover(page as never, imgSelector);

    expect(await isVisible(page as never, profileLink)).toBeTruthy();
  });
});
