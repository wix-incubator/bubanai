import {
  waitForElementPositionToBeStale,
  getBoundingBox,
  getElement,
} from '../../../src';

describe('Element Waits: waitForElementPositionToBeStale()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementPositionToBeStale Example</title>
          <style>
            .box {
              width: 200px;
              height: 200px;
              background-color: blue;
              transition: transform 1s;
            }
          </style>
        </head>
        <body>
          <div class="box"></div>
          <script>
            let transformValue = 0;
            let timeout = 400;
            const boxElement = document.querySelector('.box');
            for(let i = 0; i<3; i++) {
             setTimeout(() => {
              transformValue += 50;
              boxElement.style.transform = \`translateX(\${transformValue}px)\`;
              }, timeout);
            timeout+=300;
            }
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element position to stop changing', async () => {
    const boxElement = await getElement(page as never, '.box');

    await waitForElementPositionToBeStale(page as never, '.box', {
      timeoutMs: 3500,
    });

    const boundingBox = await getBoundingBox(boxElement);
    expect(boundingBox).not.toBeNull();
  });

  it('should throw an error if the element position is still changing within the timeout', async () => {
    await expect(
      waitForElementPositionToBeStale(page as never, '.box', {
        timeoutMs: 1500,
      }),
    ).rejects.toThrowError();
  });
});
