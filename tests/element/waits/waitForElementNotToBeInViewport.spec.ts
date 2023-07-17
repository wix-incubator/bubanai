import {
  waitForElementNotToBeInViewport,
  getElement,
  TestError,
} from '../../../src';

describe('Element Waits: waitForElementNotToBeInViewport()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementNotToBeInViewport Example</title>
          <style>
            .box {
              width: 200px;
              height: 200px;
              background-color: blue;
            }
          </style>
        </head>
        <body>
          <div class="box"></div>
          <script>
            const boxElement = document.querySelector('.box');
            setTimeout(() => {
              boxElement.style.display = 'none';
            }, 1500);
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to not be in the viewport', async () => {
    const boxElement = await getElement(page as never, '.box');

    await waitForElementNotToBeInViewport(page as never, '.box', {
      timeoutMs: 2000,
    });

    const isIntersecting = await boxElement.isIntersectingViewport();
    expect(isIntersecting).toBeFalsy();
  });

  it('should throw an error if the element is still in the viewport within the timeout', async () => {
    const timeoutMs = 800;
    await expect(
      waitForElementNotToBeInViewport(page as never, '.box', {
        timeoutMs,
      }),
    ).rejects.toThrowError(TestError.ElementIsStillInViewport(timeoutMs));
  });
});
