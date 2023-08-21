import {
  waitForElementNotToHaveAttribute,
  getAttribute,
  TestError,
} from '../../../src';

describe('Element Waits: waitForElementNotToHaveAttribute()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementNotToHaveAttribute Example</title>
          <style>
            .box {
              width: 200px;
              height: 200px;
              background-color: blue;
            }
          </style>
        </head>
        <body>
          <div class="box" data-attribute="initial"></div>
          <script>
            const boxElement = document.querySelector('.box');
            setTimeout(() => {
              boxElement.removeAttribute('data-attribute');
            }, 1300);
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element not to have the specified attribute value', async () => {
    await waitForElementNotToHaveAttribute(
      page as never,
      `//*[@class='box']`,
      'data-attribute',
      'initial',
      { timeoutMs: 2000 },
    );

    const attributeValue = await getAttribute(
      'data-attribute',
      page as never,
      '.box',
    );
    expect(attributeValue).toBe(null);
  });

  it('should throw an error if the element still has the specified attribute value within the timeout', async () => {
    const timeoutMs = 500;
    await expect(
      waitForElementNotToHaveAttribute(
        page as never,
        '.box',
        'data-attribute',
        'initial',
        { timeoutMs },
      ),
    ).rejects.toThrow(
      TestError.ElementStillHasAttribute(
        'data-attribute',
        'initial',
        timeoutMs,
      ),
    );

    const attributeValue = await getAttribute(
      'data-attribute',
      page as never,
      '.box',
    );
    expect(attributeValue).toBe('initial');
  });
});
