import {
  selectDropdownOptionByValue,
  getElement,
  isSelected,
  TestError,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionByValue()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should select the dropdown option with the matching value', async () => {
    const value = '2';

    await selectDropdownOptionByValue(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      value,
    );

    const selectedOption = await getElement(
      page as never,
      `[value='${value}']`,
    );

    expect(await isSelected(selectedOption)).toBe(true);
  });

  it('should reject if the dropdown option with the matching value was not found', async () => {
    const value = '51';

    await expect(
      selectDropdownOptionByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).rejects.toThrowError(TestError.OptionIsNotFound(value));
  });
});
