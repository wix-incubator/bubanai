import { isDisabled } from '../../../src/element/states/isDisabled';

describe('Element State: isDisabled()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_controls');
  });

  it('should return false if the element is not disabled', async () => {
    const isDisabledValue = await isDisabled(page, '#checkbox-example button');
    expect(isDisabledValue).toBeFalsy();
  });

  it('should return true if the element is disabled', async () => {
    const isDisabledValue = await isDisabled(page, '#input-example input');
    expect(isDisabledValue).toBeTruthy();
  });
});
