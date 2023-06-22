import { isDropdownOptionAvailableByValue } from '../../src';

describe('Dropdown: isDropdownOptionAvailableByValue()', () => {
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
            <option value="2" disabled>Option 2</option>
            <option value="3">Option 3</option>
          </div>
        </body>
      </html>
    `);
  });

  it('should open the dropdown and verify that the dropdown option with the specified value is available and not disabled', async () => {
    const value = '3';

    expect(
      await isDropdownOptionAvailableByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(true);
  });

  it('should return false if the dropdown option with the specified value does not exist', async () => {
    const value = '4';

    expect(
      await isDropdownOptionAvailableByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });

  it('should return false if the dropdown option with the specified value is disabled', async () => {
    const value = '2';

    expect(
      await isDropdownOptionAvailableByValue(
        page as never,
        dropdownOpenSelectorOrElement,
        dropdownOptionsSelector,
        value,
      ),
    ).toBe(false);
  });
});
