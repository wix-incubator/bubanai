import { openDropdown } from '../../src';

describe('Dropdown: openDropdown()', () => {
  beforeAll(async () => {
    await page.setContent(`
       <html>
        <head></head>
        <body>
          <div id="dropdown-container">
            <select id="dropdown-open">Open Dropdown
              <option>Option 1</li>
              <option>Option 2</li>
              <select>Option 3</li>
            </select>
          </div>
        </body>
      </html>
    `);
  });

  it('should open the dropdown and return the dropdown option elements', async () => {
    const dropdownOpenSelectorOrElement = '#dropdown-open';
    const dropdownOptionsSelector = '//option';

    const dropdownOptions = await openDropdown(
      page as never,
      dropdownOpenSelectorOrElement,
      dropdownOptionsSelector,
    );

    expect(dropdownOptions.length).toBe(3);
  });
});
