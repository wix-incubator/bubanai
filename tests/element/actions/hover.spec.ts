import { hover } from '../../../src/element/actions/hover';
import { isVisible } from '../../../src/element/states/isVisible';

describe('Element Action: hover()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/hovers');
  });

  it('should type the value to the TinyMCE WYSIWYG Editor', async () => {
    const imgSelector = '[src="/img/avatar-blank.jpg"]';
    const profileLink = '[href="/users/1"]';

    expect(await isVisible(page, profileLink)).toBeFalsy();

    await hover(page, imgSelector);

    expect(await isVisible(page, profileLink)).toBeTruthy();
  });
});
