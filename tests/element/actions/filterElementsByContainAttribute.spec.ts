import {
  filterElementsByContainAttribute,
  getElements,
  getAttribute,
} from '../../../src';

describe('Element Actions: filterElementsByContainAttribute()', () => {
  let parentElement;

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div class="target-element" data-typ="partial">Partial Element</div>
          <div class="target-element" data-type="partial-">Partial Element</div>
          <div class="target-element" data-type="partial">Partial Element</div>
          <div class="target-element" data-type="-partial">Partial Element</div>
           <div class="target-element" data-type="prtial">Partial Element</div>
          <div class="target-element" data-type="">Empty Class</div>
        </body>
      </html>
    `);

    parentElement = await getElements(page as never, '.target-element');
  });

  it('should return an array of elements containing the attribute value part', async () => {
    const attributeType = 'data-type';
    const attrValue = 'partial';

    const filteredElements = await filterElementsByContainAttribute(
      page as never,
      parentElement,
      attributeType,
      attrValue,
    );

    expect(filteredElements.length).toBe(3);

    const attributePromises = filteredElements.map((element) =>
      getAttribute(attributeType, page as never, element),
    );
    const attributeValues = await Promise.all(attributePromises);
    expect(attributeValues).toEqual(['partial-', 'partial', '-partial']);
  });

  it('should return all elements with string attributes for empty value', async () => {
    const attributeType = 'data-type';
    const attrValue = '';

    const filteredElements = await filterElementsByContainAttribute(
      page as never,
      parentElement,
      attributeType,
      attrValue,
    );

    expect(filteredElements.length).toBe(5);
  });
});
