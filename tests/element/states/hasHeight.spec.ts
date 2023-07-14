import { hasHeight } from '../../../src';

describe('Element States: hasHeight()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="elementWithHeight" style="height: 0.5px;"></div>
          <div id="elementWithoutHeight"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element computed height is not 0px', async () => {
    const result = await hasHeight(page as never, '#elementWithHeight');
    expect(result).toBe(true);
  });

  it('should return false if element computed height is 0px', async () => {
    const result = await hasHeight(page as never, '#elementWithoutHeight');
    expect(result).toBe(false);
  });
});
