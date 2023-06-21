import { getDropdownOptionByValue, getText } from '../../src';

describe('Dropdown: getDropdownOptionByValue()', () => {
  const dropdownOpenSelectorOrElement = '#dropdown-open';
  const dropdownOptionsSelector = 'option';

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head></head>
        <body>
          <div id="dropdown-container">
            <select id="dropdown-open">Open Dropdown</select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </div>
        </body>
      </html>
    `);
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
