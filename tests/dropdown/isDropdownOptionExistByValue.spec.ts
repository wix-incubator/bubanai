import { isDropdownOptionExistByValue } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: isDropdownOptionExistByValue()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and verify that the dropdown option with the specified value exists', async () => {
    const value = '2';

    expect(
      await isDropdownOptionExistByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(true);
  });

  it('should return false if the dropdown option with the specified value does not exist', async () => {
    const value = '4';

    expect(
      await isDropdownOptionExistByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });
});
