import { isChecked } from '../../../src/element/states/isChecked';
import { getElements } from '../../../src/collection/getElements';

describe('Element State: isChecked()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/checkboxes');
  });

  it('should return false if the element is not checked and the selector is passed', async () => {
    const isCheckedValue = await isChecked(page, 'input');
    expect(isCheckedValue).toBeFalsy();
  });

  it('should return true if the element is checked and the element is passed', async () => {
    const elements = await getElements(page, 'input');

    const isCheckedValue = await isChecked(page, elements[1]);
    expect(isCheckedValue).toBeTruthy();
  });
});
