import { waitToBeNotVisible, isVisible, click } from '../../../src';

describe('Element Waits: waitToBeNotVisible()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');
  });

  it('should wait until the element will be not visible', async () => {
    const loaderSelector = '#loading';
    const startButtonSelector = '#start button';

    let startButtonStatus = await isVisible(page as never, startButtonSelector);
    expect(startButtonStatus).toBeTruthy();

    await click(page as never, startButtonSelector);
    await waitToBeNotVisible(page as never, loaderSelector);

    startButtonStatus = await isVisible(page as never, startButtonSelector);
    expect(startButtonStatus).toBeFalsy();
  });
});
