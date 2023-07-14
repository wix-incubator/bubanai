import {
  filterElementsByExactAttribute,
  getElements,
  getAttribute,
  getText,
} from '../../../src';

describe('Element Actions: filterElementsByExactAttribute()', () => {
  let parentElement;

  beforeAll(async () => {
    await page.setContent(`
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div class="target-element" data-type="exact" data-value="exact-value">Exact Element</div>
          <div class="target-element" data-type="exac" data-value="partial-value">Partial Element</div>
          <div class="target-element" data-typ="exact" data-value="partial-value">Partial Element</div>
          <div class="target-element" data-type="exact" data-value="exact-value">Exact Element</div>
          <div class="target-element" data-type >Empty Class</div>
        </body>
      </html>
    `);

    parentElement = await getElements(page as never, '.target-element');
  });

  it('should return an array of elements with exact matching attribute value', async () => {
    const attributeType = 'data-type';
    const attrValue = 'exact';

    const filteredElements = await filterElementsByExactAttribute(
      page as never,
      parentElement,
      attributeType,
      attrValue,
    );

    expect(filteredElements.length).toBe(2);

    const attributePromises = filteredElements.map((element) =>
      getAttribute(attributeType, page as never, element),
    );
    const attributeValues = await Promise.all(attributePromises);
    expect(attributeValues).toEqual([attrValue, attrValue]);
  });

  it('should correctly find element with empty value', async () => {
    const attributeType = 'data-type';
    const attrValue = '';

    const filteredElements = await filterElementsByExactAttribute(
      page as never,
      parentElement,
      attributeType,
      attrValue,
    );

    expect(filteredElements.length).toBe(1);

    expect(await getText(page as never, filteredElements[0])).toEqual(
      'Empty Class',
    );
  });
});
