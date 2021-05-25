import { getText } from '../../../src/element/actions/getText';
import { getElement } from '../../../src/element/getElement';
import { getFrameByName } from '../../../src/frame/search/getFrameByName';

describe('Element Action: getText()', () => {
  it('should get text using the selector', async () => {
    await page.goto('http://the-internet.herokuapp.com/login');

    const text = await getText(page, 'h2');
    expect(text).toBe('Login Page');
  });

  it('should get text using the element', async () => {
    await page.goto('http://the-internet.herokuapp.com/login');

    const element = await getElement(page, 'h2');
    const text = await getText(page, element);
    expect(text).toBe('Login Page');
  });

  it('should get text using the element inside the frame', async () => {
    await page.goto('http://the-internet.herokuapp.com/nested_frames');

    const frame = await getFrameByName(page, 'frame-middle');
    const element = await getElement(frame, '#content');
    const text = await getText(frame, element);
    expect(text).toBe('MIDDLE');
  });
});
