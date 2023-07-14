import { ElementPropertyType, hasProperty } from '../../../src';

describe('Element States: hasProperty()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head></head>
        <body>
          <input id="inputWithPropertyValue" type="text" value="Hello">
          <input id="inputWithoutPropertyValue" type="text">
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the specified property', async () => {
    const result = await hasProperty(
      'value',
      page as never,
      '#inputWithPropertyValue',
    );
    expect(result).toBe(true);
  });

  it('should return false if element does not have the specified property', async () => {
    const result = await hasProperty(
      ElementPropertyType.value,
      page as never,
      '#inputWithoutPropertyValue',
    );
    expect(result).toBe(false);
  });

  it('should return false if element property is empty string', async () => {
    const result = await hasProperty(
      'textContent',
      page as never,
      '#inputWithPropertyValue',
    );
    expect(result).toBe(false);
  });

  it('should return false if element property is null', async () => {
    const result = await hasProperty(
      'ariaChecked',
      page as never,
      '#inputWithPropertyValue',
    );
    expect(result).toBe(false);
  });

  it('should return false if element property is undefined', async () => {
    const result = await hasProperty(
      'nonexistentProperty',
      page as never,
      '#inputWithPropertyValue',
    );
    expect(result).toBe(false);
  });

  it('should return true if element property is 0', async () => {
    const result = await hasProperty(
      'scrollTop',
      page as never,
      '#inputWithPropertyValue',
    );
    expect(result).toBe(true);
  });
});
