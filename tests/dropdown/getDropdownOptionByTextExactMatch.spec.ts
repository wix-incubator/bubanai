import { getDropdownOptionByTextExactMatch, getText } from '../../src';

describe('Dropdown: getDropdownOptionByTextExactMatch()', () => {
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
            </select>
          </div>
        </body>
      </html>
    `);
  });

  it('should open the dropdown and return the dropdown option element with exact text match', async () => {
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
