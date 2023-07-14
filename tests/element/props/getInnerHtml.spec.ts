import { getHtml } from '../../../src';

describe('Element Properties: getHtml()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
         <title>Test Page</title>
        </head>
        <body>
          <div id="element0"></div>
          <div id="element1">Inner HTML</div>
          <div id="element2"><span>More Inner HTML</span></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return the inner HTML of the specified element', async () => {
    const result = await getHtml(page as never, '#element1');
    expect(result).toBe('Inner HTML');
  });

  it('should return the inner HTML containing nested elements', async () => {
    const result = await getHtml(page as never, '#element2');
    expect(result).toBe('<span>More Inner HTML</span>');
  });

  it('should return empty string for empty inner HTML', async () => {
    const result = await getHtml(page as never, '#element0');
    expect(result).toBe('');
  });
});
