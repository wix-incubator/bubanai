import { getElementBackgroundColor } from '../../../src';

describe('Element Properties: getElementBackgroundColor()', () => {
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
          <div id="element2" class="element">Hello World</div>
              <script>
                const el = document.querySelector('.element');
                el.style.backgroundColor = 'rgb(255, 1, 1)';
              </script>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the background color style property in RGB format value for the specified element', async () => {
    const result = await getElementBackgroundColor(
      page as never,
      `//*[@id='element1']`,
    );
    expect(result).toEqual({ r: 255, g: 1, b: 1 });
  });

  it('should return undefined string if the background color property is not set', async () => {
    const result = await getElementBackgroundColor(page as never, '#element2');
    expect(result).toBeUndefined();
  });
});
