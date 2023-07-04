import { evaluateOnSelectorOrElement, getElement } from '../../../src';

describe('Element Actions: evaluateOnSelectorOrElement()', () => {
  beforeAll(async () => {
    await page.setContent(`
      <html>
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <div id="element">Hello, World!</div>
          <div>Text 2</div>
        </body>
      </html>
    `);
  });

  it('should evaluate a browser function on the element', async () => {
    const element = await getElement(page as never, '#element');
    const outerText = await evaluateOnSelectorOrElement(
      (e) => e.outerText,
      page as never,
      element,
    );

    expect(outerText).toBe('Hello, World!');
  });

  it('should evaluate a browser function on the selector', async () => {
    const element = await getElement(
      page as never,
      `//div[@id='element']//following-sibling::div`,
    );
    const outerText = await evaluateOnSelectorOrElement(
      (e) => e.outerText,
      page as never,
      element,
    );

    expect(outerText).toBe('Text 2');
  });
});
