import {
  scrollIntoView,
  getElement,
  isFullyInViewport,
  getY,
  getBoundingBox,
  scrollToTop,
} from '../../../src';

describe('Element Actions: scrollIntoView()', () => {
  let element;

  beforeEach(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body style="height: 2600px;">
          <div id="container" style="height: 500px; background-color: yellow">
            <div id="element" style="height: 200px; top: 1300px;left: 20px; background-color: #ff0000; position: relative;"></div>
          </div>
        </body>
      </html>
    `);

    element = await getElement(page as never, '#element');
  });

  afterEach(async () => {
    await page.reload();
    await scrollToTop(page as never);
  });

  it('should scroll the element into view', async () => {
    const isElementInViewBeforeScroll = await isFullyInViewport(
      page as never,
      element,
    );
    expect(isElementInViewBeforeScroll).toBe(false);

    await scrollIntoView(page as never, element);

    const isElementInViewAfterScroll = await isFullyInViewport(
      page as never,
      element,
    );
    expect(isElementInViewAfterScroll).toBe(true);
  });

  it('should align the element to the bottom of the viewport', async () => {
    const height = await page.evaluate(() => window.innerHeight);
    const boundingBox = await getBoundingBox(element);
    await scrollIntoView(page as never, element, false);
    expect(await getY(element)).toBe(height - boundingBox.height);
  });

  it('should align the element to the top of the viewport', async () => {
    expect(await getY(element)).not.toBe(0);
    await scrollIntoView(page as never, element, true);
    expect(await getY(element)).toBe(0);
  });
});
