import { getDropdownOptionBySelector } from '../../src';

describe('Dropdown: getDropdownOptionBySelector()', () => {
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

  it('should open the dropdown and return the specified dropdown option element', async () => {
    const dropdownOpenSelector = '#dropdown-open';
    const dropdownOptionSelector = `//*[@value='2']`;

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
