import { getElementsCollectionLength, getElements } from '../../../src';

describe('Element Actions: getElementsCollectionLength()', () => {
  beforeAll(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div class="element">Element 1</div>
          <div class="element" style="visibility: hidden;">Element 2</div>
          <div class="element">Element 3</div>
        </body>
      </html>'
    `);
  });

  it('should return the correct number of elements', async () => {
    const elements = await getElements(page as never, '.element');
    const length = await getElementsCollectionLength(page as never, elements);
    expect(length).toBe(3);
  });

  it('should return 0 when no elements are found', async () => {
    const length = await getElementsCollectionLength(
      page as never,
      '.non-existent-element',
    );
    expect(length).toBe(0);
  });

  it('should return 0 when an empty array of selectors is provided', async () => {
    const length = await getElementsCollectionLength(page as never, []);
    expect(length).toBe(0);
  });

  it('should return the correct number of elements using search options', async () => {
    const searchOptions = { shouldBeNotEmpty: true };
    setTimeout(() => page.setContent('<div class="element1"></div>'), 2000);
    const length = await getElementsCollectionLength(
      page as never,
      '.element1',
      searchOptions,
    );
    expect(length).toBe(1);
  });
});
