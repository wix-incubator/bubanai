import {
  waitForElementToBeNotDisabled,
  TestError,
  isDisabled,
  wait,
  getElement,
} from '../../../src';

describe('Element Waits: waitForElementToBeNotDisabled()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToBeNotDisabled Example</title>
          <style>
            .disabled {
              pointer-events: none;
              opacity: 0.5;
            }
          </style>
        </head>
        <body>
          <button id="interaction">Enable button</button>
          <button id="btn" disabled>Disabled Button</button>
          <script>
            let disabledButton = document.getElementById('btn');
            document.getElementById('interaction').addEventListener('click', function() {
              disabledButton.disabled = false;
              disabledButton.classList.remove('disabled');
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to be not disabled', async () => {
    const btnElement = await getElement(page as never, '#interaction');
    const enableButton = async () => {
      await wait(1300);
      await btnElement.click();
    };
    enableButton();
    await waitForElementToBeNotDisabled(page as never, '#btn', {
      timeoutMs: 2000,
    });

    const disabled = await isDisabled(page as never, '#btn');
    expect(disabled).toBe(false);
  });

  it('should throw an error if the element is left disabled within the timeout', async () => {
    const btnElement = await getElement(page as never, '#btn');
    const timeoutMs = 1000;

    await expect(
      waitForElementToBeNotDisabled(page as never, btnElement, {
        timeoutMs,
      }),
    ).rejects.toThrow(TestError.ElementIsLeftDisabled(timeoutMs));
  });
});
