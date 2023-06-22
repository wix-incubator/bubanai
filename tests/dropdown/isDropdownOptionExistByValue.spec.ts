import { isDropdownOptionExistByValue } from '../../src';

describe('Dropdown: isDropdownOptionExistByValue()', () => {
  const dropdownOpenSelectorOrElement = '#dropdown-open';
  const dropdownOptionsSelector = 'option';

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head></head>
        <body>
          <div id="dropdown-container">
            <select id="dropdown-open">Open Dropdown</select>
            <option value="11">Option 1</option>
            <option value="2" disabled>Option 2</option>
            <option value="3">Option 3</option>
          </div>
        </body>
      </html>
    `);
  });

  it('should open the dropdown and verify that the dropdown option with the specified value exists', async () => {
    const value = '2';

    expect(
      await isDropdownOptionExistByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(true);
  });

  it('should return false if the dropdown option with the specified value does not exist', async () => {
    const value = '1';

    expect(
      await isDropdownOptionExistByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });
});
