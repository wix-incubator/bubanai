import { waitToBeVisible, isVisible, click } from '../../../src';

describe('Element Wait: waitToBeVisible()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');
  });

  it('should wait until the element will be visible', async () => {
    const finishSelector = '#finish';
    const startButtonSelector = '#start button';

    let finishElementStatus = await isVisible(page as never, finishSelector);
    expect(finishElementStatus).toBeFalsy();

    await click(page as never, startButtonSelector);
    await waitToBeVisible(page as never, finishSelector);

    finishElementStatus = await isVisible(page as never, finishSelector);
    expect(finishElementStatus).toBeTruthy();
  });
});
