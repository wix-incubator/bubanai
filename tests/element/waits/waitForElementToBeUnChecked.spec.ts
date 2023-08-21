import {
  waitForElementToBeUnChecked,
  TestError,
  isChecked,
  wait,
  getElement,
} from '../../../src';

describe('Element Waits: waitForElementToBeUnChecked()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToBeUnChecked Example</title>
        </head>
        <body>
          <input type="checkbox" id="checkbox" checked />
        </body>
      </html>
    `);
  });

  it('should wait for the element to be unchecked', async () => {
    const checkboxElement = await getElement(page as never, '#checkbox');
    const uncheckCheckbox = async () => {
      await wait(1300);
      await checkboxElement.click();
    };
    uncheckCheckbox();
    await waitForElementToBeUnChecked(page as never, checkboxElement, {
      timeoutMs: 2000,
    });

    const checked = await isChecked(page as never, checkboxElement);
    expect(checked).toBe(false);
  });

  it('should throw an error if the element is not unchecked within the timeout', async () => {
    const checkboxElement = await getElement(page as never, '#checkbox');
    const timeoutMs = 1000;

    await expect(
      waitForElementToBeUnChecked(page as never, checkboxElement, {
        timeoutMs,
      }),
    ).rejects.toThrow(TestError.ElementIsLeftChecked(timeoutMs));
  });
});
