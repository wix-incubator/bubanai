import { isFullyInViewport } from '../../../src';

describe('Element States: isFullyInViewport()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            .fullyInViewportElement {
              width: 100px;
              height: 100px;
              margin: 0;
              padding: 0;
            }
            .partiallyInViewportElement {
              width: 100px;
              height: 100px;
              margin: 500px;
              padding: 0;
            }
            .movedUp {
              width: 10px;
              height: 10px;
              top: -1px;
              position: absolute;
            }
            .movedLeft {
              width: 10px;
              height: 10px;
              left: -1px;
              position: absolute;
            }
          </style>
        </head>
        <body>
          <div class ="movedUp"></div>
          <div class ="movedLeft"></div>
          <div class="fullyInViewportElement"></div>
          <div class="fullyInViewportElement"></div>
          <div class="partiallyInViewportElement"></div>
          <div class="partiallyInViewportElement"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element is fully in the viewport', async () => {
    const result = await isFullyInViewport(
      page as never,
      '.fullyInViewportElement',
    );
    expect(result).toBe(true);
  });

  it('should return false if element is partially in the viewport', async () => {
    const result = await isFullyInViewport(
      page as never,
      '.partiallyInViewportElement',
    );
    expect(result).toBe(false);
  });

  it('should return false if element is moved left outside the viewport', async () => {
    const result = await isFullyInViewport(page as never, '.movedLeft');
    expect(result).toBe(false);
  });

  it('should return false if element is moved up outside the viewport', async () => {
    const result = await isFullyInViewport(page as never, '.movedUp');
    expect(result).toBe(false);
  });

  it('should return true for the second element when using index', async () => {
    const result = await isFullyInViewport(
      page as never,
      '.fullyInViewportElement',
      1,
    );
    expect(result).toBe(true);
  });

  it('should return false for the second element when using index', async () => {
    const result = await isFullyInViewport(
      page as never,
      '.partiallyInViewportElement',
      1,
    );
    expect(result).toBe(false);
  });

  it('should return true with custom offsets', async () => {
    const offsets = { offsetX: 50, offsetY: 50 };
    const result = await isFullyInViewport(
      page as never,
      '.fullyInViewportElement',
      0,
      offsets,
    );
    expect(result).toBe(true);
  });

  it('should return false with custom offsets', async () => {
    const offsets = { offsetX: 50, offsetY: 50 };
    const result = await isFullyInViewport(
      page as never,
      '.partiallyInViewportElement',
      0,
      offsets,
    );
    expect(result).toBe(false);
  });
});
