import { getText, getValue, type, getFrameByName } from '../../../src';

describe('Element Action: type()', () => {
  it('should type the value to the TinyMCE WYSIWYG Editor', async () => {
    const newTextValue = '42: The answer to life, the universe and everything';
    const areaSelector = '#tinymce > p';
    const frameSelector = 'mce_0_ifr';

    await page.goto('http://the-internet.herokuapp.com/tinymce');
    const frame = await getFrameByName(page as never, frameSelector);

    await type(
      newTextValue,
      page as never,
      areaSelector,
      {},
      { delay: 50 },
      frame,
    );
    const newText = await getText(frame, areaSelector);
    expect(newText).toBe(newTextValue);
  }, 15000);

  it('should type the value to the TinyMCE WYSIWYG Editor without clearing', async () => {
    const newTextValue = 'Additional content.';
    const areaSelector = '#tinymce > p';
    const frameSelector = 'mce_0_ifr';

    await page.goto('http://the-internet.herokuapp.com/tinymce');
    const frame = await getFrameByName(page as never, frameSelector);

    const currentText = await getText(frame, areaSelector);

    await type(
      newTextValue,
      page as never,
      areaSelector,
      {},
      { delay: 50, withoutSelection: false },
      frame,
    );
    const newText = await getText(frame, areaSelector);
    expect(newText).toBe(currentText + newTextValue);
  });

  it('should type the value to the input', async () => {
    const newValue = '123.45';
    const inputSelector = '[type="number"]';

    await page.goto('http://the-internet.herokuapp.com/inputs');

    await type(newValue, page as never, inputSelector);
    const text = await getValue(page as never, inputSelector);
    expect(text).toBe(newValue);
  });
});
