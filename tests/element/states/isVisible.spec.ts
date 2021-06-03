import { isVisible } from '../../../src/element/states/isVisible';

describe('Element State: isVisible()', () => {
  it('should return true if the element is visible', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');

    const isVisibleValue = await isVisible(page, '#start');
    expect(isVisibleValue).toBeTruthy();
  });

  it('should return false if the element has display=none', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');

    const isVisibleValue = await isVisible(page, '#finish');
    expect(isVisibleValue).toBeFalsy();
  });

  it('should return false if the element bounding box === null', async () => {
    await page.goto('http://the-internet.herokuapp.com/hovers');

    const isVisibleValue = await isVisible(page, '[href="/users/1"]');
    expect(isVisibleValue).toBeFalsy();
  });
});
