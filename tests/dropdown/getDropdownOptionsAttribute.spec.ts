import { AttributeType, getDropdownOptionsAttribute } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: getDropdownOptionsAttribute()', () => {
  const dropdownOpenSelectorOrElement = `#dropdown-open`;
  const dropdownOptionsSelector = '.dropdown-item';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(dropdownHtmlStructure);
  });

  it('should open the dropdown and return an array of all dropdown option texts', async () => {
    const dropdownOptions = await getDropdownOptionsAttribute(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      AttributeType.VALUE,
    );

    expect(dropdownOptions).toEqual(['1', '2', '3', null, '14']);
  });
});
