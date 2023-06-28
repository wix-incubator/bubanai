import { ElementPropertyType, getProperty } from '../../../src';

describe('Element Properties: getProperty()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <input id="element1" type="checkbox" checked></input>
          <input id="element2" type="checkbox" disabled></input>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the value of the specified property', async () => {
    const result = await getProperty(
      ElementPropertyType.checked,
      page as never,
      '#element1',
    );
    expect(result).toBe(true);
  });

  it('should return undefined if the property does not exist', async () => {
    const result = await getProperty(
      'nonexistentProperty',
      page as never,
      '#element1',
    );
    expect(result).toBeUndefined();
  });

  it('should return false if the property value is false', async () => {
    const result = await getProperty(
      ElementPropertyType.checked,
      page as never,
      '#element2',
    );
    expect(result).toBe(false);
  });

  it('should return null if the property value is null', async () => {
    const result = await getProperty('onblur', page as never, '#element1');
    expect(result).toBeNull();
  });
});
