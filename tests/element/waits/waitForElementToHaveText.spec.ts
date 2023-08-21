import {
  waitForElementToHaveText,
  getElement,
  type,
  getText,
  TestError,
} from '../../../src';

describe('Element Waits: waitForElementToHaveText()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToHaveText Example</title>
        </head>
        <body>
          <div id="target">initial text</div>
          <input id="input" value="" />
          <script>
            let targetElement = document.getElementById('target');
            let inputElement = document.getElementById('input');
            inputElement.addEventListener('input', (event) => {
              targetElement.innerText = event.target.value;
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element text to be equal to the specified text', async () => {
    const targetElement = await getElement(page as never, '#target');
    const inputElement = await getElement(page as never, '#input');
    const expectedText = 'new1';
    const changeElementText = async () =>
      type(expectedText, page as never, inputElement, undefined, {
        delayMs: 200,
      });
    changeElementText();
    await waitForElementToHaveText(page as never, targetElement, expectedText, {
      timeoutMs: 2000,
    });

    const elementText = await getText(page as never, targetElement);
    expect(elementText).toBe(expectedText);
  });

  it('should throw an error if the element text is not equal to the specified text within the timeout', async () => {
    const targetElement = await getElement(page as never, '#target');
    const timeoutMs = 1000;
    const expectedText = 'initial tex';

    await expect(
      waitForElementToHaveText(page as never, targetElement, expectedText, {
        timeoutMs,
      }),
    ).rejects.toThrow(
      await TestError.ObjectsToBeEqual(
        async () => 'initial text',
        expectedText,
        timeoutMs,
      ),
    );
  });
});
