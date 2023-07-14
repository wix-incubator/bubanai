import { clickAtOffset, getElement } from '../../../src';

describe('Element Actions: clickAtOffset()', () => {
  let container;
  let element;
  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="container" style="position: relative; width: 200px; height: 200px;">
            <button id="element" style="position: absolute; top: 50px; left: 50px;" onclick="changeText()">Click Me</button>
          </div>

          <script>
            function changeText() {
              var button = document.getElementById('element');
              button.innerText = 'Clicked';
            }
          </script>
        </body>
      </html>
    `);
    container = await getElement(page as never, '#container');
    element = await getElement(page as never, '//button');
  });

  it('should click at the specified offset from the element', async () => {
    const offsetX = 51;
    const offsetY = 51;

    await clickAtOffset(page as never, container, { offsetX, offsetY });

    const buttonText = await page.evaluate((el) => el.innerText, element);
    expect(buttonText).toBe('Clicked');
  });
});
