import { getElementStyle } from '../../../src';

describe('Element Properties: getElementStyle()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            .element {
              font-size: 16px;
              color: red;
            }
          </style>
        </head>
        <body>
          <div id="element1" class="element">Hello World</div>
              <script>
                const el = document.querySelector('.element');
                el.style.fontFamily = 'Arial';
              </script>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the style property value for the specified element', async () => {
    const result = await getElementStyle(
      page as never,
      '#element1',
      'font-family',
    );
    expect(result).toBe('Arial');
  });

  it('should return an empty string if the style property is not set', async () => {
    const result = await getElementStyle(
      page as never,
      '#element1',
      'background-color',
    );
    expect(result).toBe('');
  });

  it('should undefined for non-existing style', async () => {
    const result = await getElementStyle(page as never, '#element1', 'any');
    expect(result).toBeUndefined();
  });
});
