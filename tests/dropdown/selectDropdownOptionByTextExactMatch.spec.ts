import {
  selectDropdownOptionByTextExactMatch,
  getElement,
  TestError,
} from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: selectDropdownOptionByTextExactMatch()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should select the dropdown option with the exact matching text', async () => {
    const text = 'Option 2';

    await selectDropdownOptionByTextExactMatch(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      text,
    );

    const selectedOption = await getElement(
      page as never,
      `.dropdown-item.selected`,
    );

    expect(await selectedOption.evaluate((el) => el.textContent)).toBe(text);
  });

  it('should reject if the dropdown option with the exact matching text was not found', async () => {
    const text = 'Option 51';

    await expect(
      selectDropdownOptionByTextExactMatch(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        text,
      ),
    ).rejects.toThrowError(TestError.OptionIsNotFound(text));
  });
});
