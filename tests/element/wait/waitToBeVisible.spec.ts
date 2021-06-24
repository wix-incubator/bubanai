import { waitToBeVisible } from '../../../src/element/waits/waitToBeVisible';
import { isVisible } from '../../../src/element/states/isVisible';
import { click } from '../../../src/element/actions/click';

describe('Element Wait: waitToBeVisible()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');
  });

  it('should wait until the element will be visible', async () => {
    const finishSelector = '#finish';
    const startButtonSelector = '#start button';

    let finishElementStatus = await isVisible(page, finishSelector);
    expect(finishElementStatus).toBeFalsy();

    await click(page, startButtonSelector);
    await waitToBeVisible(page, finishSelector);

    finishElementStatus = await isVisible(page, finishSelector);
    expect(finishElementStatus).toBeTruthy();
  });
});
