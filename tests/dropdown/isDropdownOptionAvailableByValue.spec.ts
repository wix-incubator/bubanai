import { isDropdownOptionAvailableByValue } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: isDropdownOptionAvailableByValue()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and verify that the dropdown option with the specified value is available and not disabled', async () => {
    const value = '2';

    expect(
      await isDropdownOptionAvailableByValue(
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
      await isDropdownOptionAvailableByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });

  it('should return false if the dropdown option with the specified value is disabled', async () => {
    const value = '3';

    expect(
      await isDropdownOptionAvailableByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });
});
