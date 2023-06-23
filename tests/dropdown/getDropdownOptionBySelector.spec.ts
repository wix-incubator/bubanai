import { getDropdownOptionBySelector } from '../../src';
import { dropdownHtmlStructure } from './dropdownUtils.testKit';

describe('Dropdown: getDropdownOptionBySelector()', () => {
  it('should open the dropdown and return the specified dropdown option element', async () => {
    const dropdownOpenSelector = '#dropdown-open';
    const dropdownOptionSelector = `//*[@data-value='option2']`;
    await page.setContent(dropdownHtmlStructure);
    const dropdownOption = await getDropdownOptionBySelector(
      page as never,
      dropdownOpenSelector,
      dropdownOptionSelector,
    );

    expect(await dropdownOption.evaluate((el) => el.textContent)).toBe(
      'Option 2',
    );
  });
});
