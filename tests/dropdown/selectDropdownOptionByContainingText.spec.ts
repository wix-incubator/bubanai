import {
  selectDropdownOptionByContainingText,
  openDropdown,
  isSelected,
  getElement,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionByContainingText()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';
  let selectedOption;
  let notSelectedOption;

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
    selectedOption = await getElement(page as never, `//*[@value='2']`);
    notSelectedOption = await getElement(page as never, `[value='1']`);
  });

  it('should open the dropdown and select the option containing the specified text', async () => {
    const text = 'Option 2';

    await selectDropdownOptionByContainingText(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      text,
    );

    expect(await isSelected(selectedOption)).toBe(true);
    expect(await isSelected(notSelectedOption)).toBe(false);
  });

  it('should not open the dropdown and select the option containing the specified text on null', async () => {
    const text = 'Option 2';

    await openDropdown(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
    );

    await selectDropdownOptionByContainingText(
      page as never,
      null,
      dropdownOptionsSelector,
      text,
    );

    expect(await isSelected(selectedOption)).toBe(true);
    expect(await isSelected(notSelectedOption)).toBe(false);
  });
});
