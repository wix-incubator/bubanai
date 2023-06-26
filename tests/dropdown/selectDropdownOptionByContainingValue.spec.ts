import {
  selectDropdownOptionByContainingValue,
  getElement,
  isSelected,
  TestError,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionByContainingValue()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should select the dropdown option with a value that contains the specified value', async () => {
    const value = '14';

    await selectDropdownOptionByContainingValue(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      value,
    );

    const selectedOption = await getElement(page as never, `[value='14']`);

    expect(await isSelected(selectedOption)).toBe(true);
  });

  it('should reject if dropdown option was not found', async () => {
    const value = 'o';
    await expect(
      selectDropdownOptionByContainingValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).rejects.toThrowError(
      TestError.OptionIsNotFound(dropdownOpenSelectorOrElement),
    );
  });
});
