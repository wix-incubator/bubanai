import { isBold } from '../../../src';

describe('Element States: isBold()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <title>Test Page</title>
          <style>
            #boldElement {
              font-weight: bold;
            }
            #normalElement {
              font-weight: normal;
            }
          </style>
        </head>
        <body>
          <div id="boldElement">This is bold text.</div>
          <div id="normalElement">This is normal text.</div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element computed font weight is 700', async () => {
    const result = await isBold(page as never, '#boldElement');
    expect(result).toBe(true);
  });

  it('should return false if element computed font weight is not 700', async () => {
    const result = await isBold(page as never, '#normalElement');
    expect(result).toBe(false);
  });
});
