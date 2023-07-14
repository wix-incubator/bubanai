import { filterVisibleElements, getElements, getText } from '../../../src';

describe('Element Actions: filterVisibleElements()', () => {
  let element;

  beforeAll(async () => {
    await page.setContent(`
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div class="element">Visible Element</div>
          <div class="element" data-hidden="true" style="visibility: hidden;">Hidden Element</div>
          <div class="element" data-hidden="true" style="display: none;">Hidden Element</div>
          <div class="element" data-hidden="true" style="position: absolute; top: -500px;">Partially Visible Element</div>
        </body>
      </html>
    `);

    element = await getElements(page as never, '.element');
  });

  it('should return an array of visible elements', async () => {
    const filteredElements = await filterVisibleElements(
      element,
      page as never,
    );

    expect(filteredElements.length).toBe(1);

    const elementText = await getText(page as never, filteredElements[0]);
    expect(elementText).toBe('Visible Element');
  });

  it('should return empty array if all elements are invisible', async () => {
    const filteredElements = await filterVisibleElements(
      `//*[@data-hidden='true']`,
      page as never,
    );

    expect(filteredElements).toEqual([]);
  });
});
