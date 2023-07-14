import { isItalic } from '../../../src';

describe('Element States: isItalic()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <title>Test Page</title>
          <style>
            #italicElement {
              font-style: italic;
            }
            #normalElement {
              font-style: normal;
            }
          </style>
        </head>
        <body>
          <div id="italicElement">This is italic text.</div>
          <div id="normalElement">This is normal text.</div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element computed font style is italic', async () => {
    const result = await isItalic(page as never, '#italicElement');
    expect(result).toBe(true);
  });

  it('should return false if element computed font style is not italic', async () => {
    const result = await isItalic(page as never, '#normalElement');
    expect(result).toBe(false);
  });
});
