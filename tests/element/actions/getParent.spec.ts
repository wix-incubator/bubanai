import {
  getParent,
  getElement,
  evaluateOnSelectorOrElement,
} from '../../../src';

describe('Element Actions: getParent()', () => {
  let childElement;

  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="parent">
            <div id="child">Child Element</div>
          </div>
        </body>
      </html>
    `);

    childElement = await getElement(page as never, '#child');
  });

  it('should return the parent element of the specified element', async () => {
    const parentElement = await getParent(page as never, childElement);

    const parentId = await evaluateOnSelectorOrElement(
      (e) => e.id,
      page as never,
      parentElement,
    );
    expect(parentId).toBe('parent');
  });
});
