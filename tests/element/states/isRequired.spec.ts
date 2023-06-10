import { isRequired } from '../../../src';

describe('Element States: isRequired()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <input id="requiredInput" type="text" required />
          <input id="notRequiredInput" type="text" />
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the "required" property', async () => {
    const result = await isRequired(page as never, '#requiredInput');
    expect(result).toBe(true);
  });

  it('should return false if element does not have the "required" property', async () => {
    const result = await isRequired(page as never, '#notRequiredInput');
    expect(result).toBe(false);
  });
});
