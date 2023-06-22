import { AttributeType, getDropdownOptionsAttribute } from '../../src';

describe('Dropdown: getDropdownOptionsAttribute()', () => {
  const dropdownOpenSelectorOrElement = `//select[@id='dropdown-open']`;
  const dropdownOptionsSelector = 'option';

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head></head>
        <body>
          <div id="dropdown-container">
            <select id="dropdown-open">Open Dropdown</select>
            <option value="1">Option 1</option>
            <option>Option 2</option>
            <option value="3">Option 3</option>
          </div>
        </body>
      </html>
    `);
  });

  it('should open the dropdown and return an array of all dropdown option texts', async () => {
    const dropdownOptions = await getDropdownOptionsAttribute(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
      AttributeType.VALUE,
    );

    expect(dropdownOptions).toEqual(['1', null, '3']);
  });
});
