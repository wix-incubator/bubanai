import { clickOnParent, getElement } from '../../../src';

describe('Element Actions: clickOnParent()', () => {
  let child;

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="parent" onclick="changeText()">
            <button id="child">Click Me</button>
          </div>

          <script>
            function changeText() {
              var button = document.getElementById('child');
              button.innerText = 'Parent Clicked';
            }
          </script>
        </body>
      </html>
    `);

    child = await getElement(page as never, '#child');
  });

  it('should click on the parent element', async () => {
    await clickOnParent(page as never, child);

    const buttonText = await page.evaluate((el) => el.innerText, child);
    expect(buttonText).toBe('Parent Clicked');
  });
});
