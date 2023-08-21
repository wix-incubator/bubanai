import {
  waitForElementToBeChecked,
  TestError,
  getElement,
  isChecked,
  wait,
} from '../../../src';

describe('Element Waits: waitForElementToBeChecked()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToBeChecked Example</title>
        </head>
        <body>
          <input type="checkbox" id="checkbox" />
        </body>
      </html>
    `);
  });

  it('should wait for the element to be checked', async () => {
    const checkboxElement = await getElement(page as never, '#checkbox');
    const checkCheckbox = async () => {
      await wait(1300);
      await checkboxElement.click();
    };
    checkCheckbox();
    await waitForElementToBeChecked(page as never, checkboxElement, {
      timeoutMs: 2000,
    });

    const checked = await isChecked(page as never, checkboxElement);
    expect(checked).toBe(true);
  });

  it('should throw an error if the element is not checked within the timeout', async () => {
    const timeoutMs = 2000;
    await expect(
      waitForElementToBeChecked(page as never, '#checkbox', {
        timeoutMs,
      }),
    ).rejects.toThrow(TestError.ElementIsNotChecked(timeoutMs));
  });
});
