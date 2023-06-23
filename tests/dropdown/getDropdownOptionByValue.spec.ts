import { getDropdownOptionByValue, getText } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: getDropdownOptionByValue()', () => {
  const dropdownOpenSelectorOrElement = '#dropdown-open';
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and return the dropdown option element with matching value', async () => {
    const value = '2';

    const dropdownOption = await getDropdownOptionByValue(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      value,
    );

    expect(await getText(page as never, dropdownOption)).toBe('Option 2');
  });

  it('should return undefined if the dropdown option with the matching value does not exist', async () => {
    const value = '4';

    await expect(
      getDropdownOptionByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).resolves.toBeUndefined();
  });
});
