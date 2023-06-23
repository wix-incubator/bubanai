import { ElementPropertyType, hasTruthyProperty } from '../../../src';

describe('Element States: hasTruthyProperty()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <input id="inputWithTruthyValue" type="checkbox" checked>
          <input id="inputWithFalsyValue" type="checkbox">
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element property is truthy', async () => {
    const result = await hasTruthyProperty(
      ElementPropertyType.checked,
      page as never,
      '#inputWithTruthyValue',
    );
    expect(result).toBe(true);
  });

  it('should return false if element property is falsy', async () => {
    const result = await hasTruthyProperty(
      ElementPropertyType.checked,
      page as never,
      '#inputWithFalsyValue',
    );
    expect(result).toBe(false);
  });

  it('should return false if element property is undefined', async () => {
    const result = await hasTruthyProperty(
      'nonexistentProperty',
      page as never,
      '#inputWithTruthyValue',
    );
    expect(result).toBe(false);
  });
});
