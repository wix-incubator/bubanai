import { waitForElement, getElement, wait } from '../../../src';

describe('Element Waits: waitForElement()', () => {
  const classToWaitFor = 'highlighted';

  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElement Example</title>
          <style>
            .highlighted {
              background-color: yellow;
            }
          </style>
        </head>
        <body>
          <div id="element">Element to Wait For</div>
          <button id="button">Click Me</button>

          <script>
            const element = document.getElementById('element');
            const button = document.getElementById('button');

            button.addEventListener('click', () => {
              element.classList.add('${classToWaitFor}');
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element with the assigned class to be visible and return it', async () => {
    const button = await getElement(page as never, '#button');
    const action = async () => {
      await wait(1100);
      button.click();
    };

    action();
    const element = await waitForElement(page as never, `.${classToWaitFor}`, {
      visible: true,
      timeout: 2000,
    });

    expect(element).toBeTruthy();
    expect(await element.evaluate((node) => node.textContent)).toBe(
      'Element to Wait For',
    );
  });

  it('should throw an error if the element with the assigned class is not found within the timeout', async () => {
    await expect(
      waitForElement(
        page as never,
        `.${classToWaitFor}`,
        {},
        { timeoutMs: 1000 },
      ),
    ).rejects.toThrow();
  });
});
