import { getValue } from '../../../src/element/actions/getValue';
import { click } from '../../../src/element/actions/click';
import { getElement } from '../../../src/element/getElement';

describe('Element Action: getValue()', () => {
  const sliderSelector = 'input';
  const defaultValue = '0';

  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/horizontal_slider');
  });

  it('should get value using the selector', async () => {
    const value = await getValue(page, sliderSelector);
    expect(value).toBe(defaultValue);
  });

  it('should get value using the element', async () => {
    const slider = await getElement(page, sliderSelector);
    const value = await getValue(page, slider);
    expect(value).toBe(defaultValue);
  });

  it('should return the updated value', async () => {
    let value = await getValue(page, sliderSelector);
    expect(value).toBe(defaultValue);

    await click(page, sliderSelector);

    value = await getValue(page, sliderSelector);
    expect(value).toBe('2.5');
  });
});
