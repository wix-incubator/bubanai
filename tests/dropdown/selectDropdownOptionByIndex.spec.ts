import {
  selectDropdownOptionByIndex,
  getElement,
  isSelected,
  TestError,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionByIndex()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should select the dropdown option at the specified index', async () => {
    const index = 5;

    await selectDropdownOptionByIndex(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      index,
    );

    const selectedOption = await getElement(page as never, `[value='514']`);

    expect(await isSelected(selectedOption)).toBe(true);
  });

  it('should reject if the specified index is out of range', async () => {
    const index = 20;

    await expect(
      selectDropdownOptionByIndex(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        index,
      ),
    ).rejects.toThrow(TestError.OptionIsNotFound(index));
  });
});
