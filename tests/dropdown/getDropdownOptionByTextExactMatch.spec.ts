import { getDropdownOptionByTextExactMatch, getText } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: getDropdownOptionByTextExactMatch()', () => {
  const dropdownOpenSelectorOrElement = '#dropdown-open';
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
  });

  it('should open the dropdown and return the dropdown option element with exact text match', async () => {
    await page.setContent(dropdownHtmlStructure);
    const text = 'Option 2';

    const dropdownOption = await getDropdownOptionByTextExactMatch(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      text,
    );

    expect(await getText(page as never, dropdownOption)).toBe(text);
  });

  it('should return undefined if the dropdown option with exact text match does not exist', async () => {
    const text = 'option 2';
    await page.setContent(dropdownHtmlStructure);
    await expect(
      getDropdownOptionByTextExactMatch(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        text,
      ),
    ).resolves.toBeUndefined();
  });
});
