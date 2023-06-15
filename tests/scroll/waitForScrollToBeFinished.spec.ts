import { getScroll, waitForScrollToBeFinished } from '../../src';

jest.mock('../../src/scroll/getScroll', () => {
  const original = jest.requireActual('../../src/scroll/getScroll');
  const mockedGetScroll = (...args) => {
    return original.getScroll(...args);
  };
  return {
    ...original,
    getScroll: jest.fn(mockedGetScroll),
  };
});

describe('Scroll: waitForScrollToBeFinished()', () => {
  it('resolves if scroll is finished before timeout', async () => {
    await page.setContent(`<html>
            <head>
              <style>
                .bigElement {
                  height: 200vh;
                }
              </style>
            </head>
            <body>
              <div class="bigElement">
              </div>
            </body>
            </html>`);
    const pollIntervalMs = 500;
    const startChangingTime = 400;
    const changeScrollFunc = async () =>
      await page.evaluate((_height) => {
        window.scroll(0, _height);
      }, 10);
    let counter = 0;
    setInterval(() => {
      changeScrollFunc();
      counter++;
      if (counter >= 3) {
        clearInterval();
      }
    }, startChangingTime);

    await expect(
      waitForScrollToBeFinished(page as never, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(getScroll).toHaveBeenCalledTimes(4);
  });
});
