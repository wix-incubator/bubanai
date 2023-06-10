import { isChecked } from '../../../src';

describe('Element States: isChecked()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <input id="checkedInput" type="checkbox" checked />
          <input id="uncheckedInput" type="checkbox" />
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the checked property', async () => {
    const result = await isChecked(page as never, '#checkedInput');
    expect(result).toBe(true);
  });

  it('should return false if element does not have the checked property', async () => {
    const result = await isChecked(page as never, '#uncheckedInput');
    expect(result).toBe(false);
  });
});
