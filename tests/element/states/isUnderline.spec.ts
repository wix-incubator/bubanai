import { isUnderline } from '../../../src';

describe('Element States: isUnderline()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
          <title>Test Page</title>
          <style>
            #underlineElement {
              text-decoration: underline;
            }
            #normalElement {
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div id="underlineElement">This has underline.</div>
          <div id="normalElement">This has no underline.</div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element computed text decoration includes underline', async () => {
    const result = await isUnderline(page as never, '#underlineElement');
    expect(result).toBe(true);
  });

  it('should return false if element computed text decoration does not include underline', async () => {
    const result = await isUnderline(page as never, '#normalElement');
    expect(result).toBe(false);
  });
});
