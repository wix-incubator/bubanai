import { isSelected, getElement } from '../../../src';

describe('Element States: isSelected()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html>
        <head></head>
        <body>
          <div id="selectedElement" class="selected"></div>
          <div id="unselectedElement"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return true if element has the "selected" class', async () => {
    const element = await getElement(page as never, '#selectedElement');
    const result = await isSelected(element);
    expect(result).toBe(true);
  });

  it('should return false if element does not have the "selected" class', async () => {
    const element = await getElement(page as never, '#unselectedElement');
    const result = await isSelected(element);
    expect(result).toBe(false);
  });
});
