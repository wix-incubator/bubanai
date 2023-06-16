import { getElement, hasClass } from '../../../src';
import { ElementHandle } from 'puppeteer-core';

describe('Element States: hasClass()', () => {
  let element: ElementHandle;

  beforeAll(async () => {
    const htmlContent = `
    <html>
      <head></head>
      <body>
        <div id="testElement1" class="class1 class2 class3"></div>
      </body>
    </html>
  `;

    await page.setContent(htmlContent);
    element = await getElement(page as never, `//*[@id='testElement1']`);
  });

  it('should return true if element contains the specified class', async () => {
    const result = await hasClass(element, 'class2');
    expect(result).toBe(true);
  });

  it('should return true if element contains the class part', async () => {
    const result = await hasClass(element, 'class');
    expect(result).toBe(true);
  });

  it('should return false if element does not contain the specified class', async () => {
    const result = await hasClass(element, '1class');
    expect(result).toBe(false);
  });
});
