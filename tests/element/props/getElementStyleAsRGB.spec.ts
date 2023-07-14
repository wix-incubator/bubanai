import { getElementStyleAsRGB } from '../../../src';

describe('Element Properties: getElementStyleAsRGB()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <style>
            .element {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div id="element1" class="element">Hello World</div>
              <script>
                const el = document.querySelector('.element');
                el.style.color = 'rgb(255, 1, 1)';
              </script>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the style property in RGB format value for the specified element', async () => {
    const result = await getElementStyleAsRGB(
      page as never,
      '#element1',
      'color',
    );
    expect(result).toEqual({ r: 255, g: 1, b: 1 });
  });

  it('should return undefined string if the style property is not set', async () => {
    const result = await getElementStyleAsRGB(
      page as never,
      '#element1',
      'background-color',
    );
    expect(result).toBeUndefined();
  });

  it('should undefined for non-existing style', async () => {
    const result = await getElementStyleAsRGB(
      page as never,
      '#element1',
      'any',
    );
    expect(result).toBeUndefined();
  });
});
