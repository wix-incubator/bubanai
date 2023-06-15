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
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    const startChangingTime = 300;
    const changeScrollFunc = () =>
      page.evaluate((_height) => {
        window.scroll(0, _height);
      }, 10);
    setTimeout(() => changeScrollFunc(), startChangingTime);
    setTimeout(() => changeScrollFunc(), startChangingTime * 2);
    setTimeout(() => changeScrollFunc(), startChangingTime * 3);

    await expect(
      waitForScrollToBeFinished(page as never, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    expect(getScroll).toHaveBeenCalledTimes(4);
  });
});
