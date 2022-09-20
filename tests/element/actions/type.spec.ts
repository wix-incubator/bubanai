import { getText, getValue, type, getFrameByName } from '../../../src';

describe('Element Action: type()', () => {
  it('should type the value to the TinyMCE WYSIWYG Editor', async () => {
    const newTextValue = '42: The answer to life, the universe and everything';
    const areaSelector = '#tinymce > p';
    const frameSelector = 'mce_0_ifr';

    await page.goto('http://the-internet.herokuapp.com/tinymce');
    const frame = await getFrameByName(page, frameSelector);

    await type(newTextValue, frame, areaSelector, {}, {}, page);
    const newText = await getText(frame, areaSelector);
    expect(newText).toBe(newTextValue);
  }, 15000);

  it('should type the value to the TinyMCE WYSIWYG Editor without clearing', async () => {
    const newTextValue = 'Additional content.';
    const areaSelector = '#tinymce > p';
    const frameSelector = 'mce_0_ifr';

    await page.goto('http://the-internet.herokuapp.com/tinymce');
    const frame = await getFrameByName(page, frameSelector);

    const currentText = await getText(frame, areaSelector);

    await type(
      newTextValue,
      frame,
      areaSelector,
      {},
      { clearInput: false },
      page,
    );
    const newText = await getText(frame, areaSelector);
    expect(newText).toBe(currentText + newTextValue);
  });

  it('should type the value to the input', async () => {
    const newValue = '123.45';
    const inputSelector = '[type="number"]';

    await page.goto('http://the-internet.herokuapp.com/inputs');

    await type(newValue, page, inputSelector);
    const text = await getValue(page, inputSelector);
    expect(text).toBe(newValue);
  });
});
