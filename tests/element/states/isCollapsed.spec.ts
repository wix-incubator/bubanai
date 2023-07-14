import { getElement, isCollapsed } from '../../../src';

describe('Element States: isCollapsed()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head></head>
        <body>
          <div id="collapsedElement" class="closed"></div>
          <div id="expandedElement"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the "closed" class', async () => {
    const result = await isCollapsed(
      await getElement(page as never, '#collapsedElement'),
    );
    expect(result).toBe(true);
  });

  it('should return false if element does not have the "closed" class', async () => {
    const result = await isCollapsed(
      await getElement(page as never, '#expandedElement'),
    );
    expect(result).toBe(false);
  });
});
