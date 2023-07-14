import { scrollTo, scrollToTop } from '../../src';

jest.mock('../../src/scroll/scrollTo', () => ({
  ...jest.requireActual('../../src/scroll/scrollTo'),
  scrollTo: jest.fn(),
}));
describe('Scroll: scrollToTop()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call scroll to 0 by height', async () => {
    await page.setContent(`<html lang="en">
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

    await scrollToTop(page as never);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollTo).toHaveBeenCalledWith(page as never, 0);
    expect(scrollY).toBe(0);
  });
});
