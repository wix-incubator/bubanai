import { getText, getElement, getFrameByName } from '../../../src';

describe('Element Properties: getText()', () => {
  it('should get text using the selector', async () => {
    await page.goto('http://the-internet.herokuapp.com/login');

    const text = await getText(page as never, 'h2');
    expect(text).toBe('Login Page');
  });

  it('should get text using the element', async () => {
    await page.goto('http://the-internet.herokuapp.com/login');

    const element = await getElement(page as never, 'h2');
    const text = await getText(page as never, element);
    expect(text).toBe('Login Page');
  });

  it('should get text using the element inside the frame', async () => {
    await page.goto('http://the-internet.herokuapp.com/nested_frames');

    const frame = await getFrameByName(page as never, 'frame-middle');
    const element = await getElement(frame, '#content');
    const text = await getText(frame, element);
    expect(text).toBe('MIDDLE');
  });
});
