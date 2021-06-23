import { waitToBeNotVisible } from '../../../src/element/waits/waitToBeNotVisible';
import { isVisible } from '../../../src/element/states/isVisible';
import { click } from '../../../src/element/actions/click';

describe('Element Wait: waitToBeNotVisible()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');
  });

  it('should wait until the element will be not visible', async () => {
    const loaderSelector = '#loading';
    const startButtonSelector = '#start button';

    let startButtonStatus = await isVisible(page, startButtonSelector);
    expect(startButtonStatus).toBeTruthy();

    await click(page, startButtonSelector);
    await waitToBeNotVisible(page, loaderSelector);

    startButtonStatus = await isVisible(page, startButtonSelector);
    expect(startButtonStatus).toBeFalsy();
  });
});
