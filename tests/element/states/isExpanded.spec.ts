import { getElement, isExpanded } from '../../../src';

describe('Element States: isExpanded()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <div id="collapsedElement"></div>
          <div id="expandedElement" class="open"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the "open" class', async () => {
    const result = await isExpanded(
      await getElement(page as never, '#expandedElement'),
    );
    expect(result).toBe(true);
  });

  it('should return false if element does not have the "open" class', async () => {
    const result = await isExpanded(
      await getElement(page as never, '#collapsedElement'),
    );
    expect(result).toBe(false);
  });
});
