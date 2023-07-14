import { getComputedStyle } from '../../../src';

describe('Element Properties: getComputedStyle()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <style>
            .element {
              font-family: Verdana, serif;
              font-size: 16px;
              color: rgb(255, 0, 0);
            }
            .element::before {
              width: 196px;
              font-weight: bold;
            }
          </style>
          <title>Test</title>
        </head>
        <body>
          <div id="element1" class="element">Hello World</div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the computed style property for the specified element', async () => {
    const result = await getComputedStyle(
      'font-family',
      page as never,
      '#element1',
    );
    expect(result).toBe('Verdana, serif');
  });

  it('should return undefined if the property does not exist', async () => {
    const result = await getComputedStyle(
      'nonexistentProperty',
      page as never,
      '#element1',
    );
    expect(result).toBeUndefined();
  });

  it('should return the computed style property for declared pseudo element', async () => {
    const result = await getComputedStyle(
      'width',
      page as never,
      '#element1',
      '::before',
    );
    expect(result).toBe('196px');
  });
});
