import { getAttribute } from '../../../src';

describe('Element Properties: getAttribute()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="element1" data-color="blue"></div>
          <input id="element2" type="checkbox" checked>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the value of the specified attribute', async () => {
    const result = await getAttribute('data-color', page as never, '#element1');
    expect(result).toBe('blue');
  });

  it('should return null if the attribute does not exist', async () => {
    const result = await getAttribute(
      'nonexistentAttribute',
      page as never,
      `//*[@id='element1']`,
    );
    expect(result).toBeNull();
  });

  it('should return empty string if the element does not have the specified attribute value', async () => {
    const result = await getAttribute('checked', page as never, '#element2');
    expect(result).toBe('');
  });
});
