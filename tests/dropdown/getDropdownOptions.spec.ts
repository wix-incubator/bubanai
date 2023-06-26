import { getDropdownOptions } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: getDropdownOptions()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and return an array of all dropdown option texts', async () => {
    const dropdownOptions = await getDropdownOptions(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
    );

    expect(dropdownOptions).toEqual([
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 14',
      'Option 514',
    ]);
  });
});
