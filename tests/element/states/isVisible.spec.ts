import { isVisible } from '../../../src';

describe('Element States: isVisible()', () => {
  it('should return true if the element is visible', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');

    const isVisibleValue = await isVisible(page as never, '#start');
    expect(isVisibleValue).toBeTruthy();
  });

  it('should return false if the element has display=none', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_loading/1');

    const isVisibleValue = await isVisible(page as never, `//*[@id='finish']`);
    expect(isVisibleValue).toBeFalsy();
  });

  it('should return false if the element has visibility=hidden', async () => {
    await page.goto(
      'https://preview.amp.dev/documentation/examples/visual-effects/scroll_to_top#amp=1',
    );

    const isVisibleValue = await isVisible(page as never, '#scrollToTopButton');
    expect(isVisibleValue).toBeFalsy();
  });

  it('should return false if the element bounding box === null', async () => {
    await page.goto('http://the-internet.herokuapp.com/hovers');

    const isVisibleValue = await isVisible(page as never, '[href="/users/1"]');
    expect(isVisibleValue).toBeFalsy();
  });
});
