import { openDropdown } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: openDropdown()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and return the dropdown option elements', async () => {
    const dropdownOptions = await openDropdown(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
    );

    expect(dropdownOptions.length).toBe(5);
  });
});
