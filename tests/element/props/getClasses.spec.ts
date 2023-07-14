import { getClasses } from '../../../src';

describe('Element Properties: getClasses()', () => {
  beforeAll(async () => {
    const htmlContent = `
      <html lang="en">
        <head>
         <title>Test Page</title>
        </head>
        <body>
          <div id="element1" class="class1  class2 class3"></div>
          <div id="element2"></div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
  });

  it('should return an array of classes for the specified element', async () => {
    const result = await getClasses(page as never, '#element1');
    expect(result).toEqual(['class1', 'class2', 'class3']);
  });

  it('should return an empty array if the element has no classes', async () => {
    const result = await getClasses(page as never, '#element2');
    expect(result).toEqual([]);
  });
});
