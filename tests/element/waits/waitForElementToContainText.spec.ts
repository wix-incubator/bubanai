import {
  waitForElementToContainText,
  TestError,
  getText,
  wait,
  getElement,
} from '../../../src';

describe('Element Waits: waitForElementToContainText()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToContainText Example</title>
        </head>
        <body>
          <div class="box">This is a tes</div>
        </body>
      </html>
    `);
  });

  it('should wait for the element to contain the specified text', async () => {
    const divElement = await getElement(page as never, '.box');
    const addTextToDiv = async () => {
      await wait(1100);
      await divElement.evaluate((el) => {
        el.textContent = 'This is a test element';
      });
    };
    addTextToDiv();
    await waitForElementToContainText(
      page as never,
      divElement,
      'This is a test',
      {
        timeoutMs: 2000,
      },
    );

    const elementText = await getText(page as never, divElement);
    expect(elementText.includes('This is a test')).toBe(true);
  });

  it('should throw an error if the element does not contain the specified text within the timeout', async () => {
    const divElement = await getElement(page as never, '.box');
    const timeoutMs = 1000;
    const text = 'This is a test';

    await expect(
      waitForElementToContainText(page as never, divElement, text, {
        timeoutMs,
      }),
    ).rejects.toThrowError(TestError.ElementIsNotContainText(text, timeoutMs));
  });
});
