import {
  getBoundingBox,
  getElement,
  scrollTo,
  scrollToBottom,
} from '../../src';

jest.mock('../../src/scroll/scrollTo', () => {
  const original = jest.requireActual('../../src/scroll/scrollTo');
  const mockedScrollTo = (...args) => {
    return original.scrollTo(...args);
  };
  return {
    ...original,
    scrollTo: jest.fn(mockedScrollTo),
  };
});
describe('Scroll: scrollToBottom()', () => {
  let element;
  beforeEach(async () => {
    await page.setContent(`
      <html>
        <head>
          <style>
          body {
              margin: 0;
              padding: 0;
          }
           .bigElement {
              height: 110vh;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <div class="bigElement"></div>
        </body>
      </html>
    `);
    element = await getElement(page as never, '.bigElement');
  });

  it('should scroll to the bottom of the document', async () => {
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const elementBounding = await getBoundingBox(element);

    await scrollToBottom(page as never);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toEqual(elementBounding.height - viewportHeight);
  });

  it('should perform continuous scroll to the bottom', async () => {
    const viewport = { width: 51, height: 51 };
    await page.setViewport(viewport);
    const elementBounding = await getBoundingBox(element);
    await scrollToBottom(page as never, true);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toEqual(
      Math.round(elementBounding.height - viewport.height),
    );

    expect(scrollTo).toHaveBeenCalledTimes(
      Math.round((viewport.height + scrollY) / 50 + 2),
    );
  });
});
