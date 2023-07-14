import { scrollTo, waitForScrollToBeFinished } from '../../src';

jest.mock('../../src/scroll/waitForScrollToBeFinished', () => ({
  ...jest.requireActual('../../src/scroll/waitForScrollToBeFinished'),
  waitForScrollToBeFinished: jest.fn(),
}));
describe('Scroll: scrollTo()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should scroll to the specified height', async () => {
    await page.setContent(`<html lang="en">
            <head>
              <style>
                .bigElement {
                  height: 200vh;
                }
              </style>
              <title>Test</title>
            </head>
            <body>
              <div class="bigElement">
              </div>
            </body>
            </html>`);
    const height = 500;

    await scrollTo(page as never, height);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(waitForScrollToBeFinished).toHaveBeenCalledWith(page as never);
    expect(scrollY).toBe(height);
  });
});
