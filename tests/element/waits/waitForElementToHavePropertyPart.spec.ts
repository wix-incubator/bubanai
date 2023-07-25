import {
  waitForElementToHavePropertyPart,
  TestError,
  getProperty,
  getElement,
} from '../../../src';

describe('Element Waits: waitForElementToHavePropertyPart()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToHavePropertyPart Example</title>
        </head>
        <body>
          <div id="element"></div>
          <script>
            setTimeout(() => {
              const element = document.getElementById('element');
              element.innerText = '1000 dsdsd updated';
            }, 1000);
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to have the specified property value part', async () => {
    const element = await getElement(page as never, '#element');
    const property = 'innerText';
    const valuePart = 'dsdsd';
    const waitOptions = { timeoutMs: 2000 };

    await waitForElementToHavePropertyPart(
      page as never,
      element,
      property,
      valuePart,
      waitOptions,
    );

    const currentValue = await getProperty(property, page as never, element);
    expect(currentValue.toString()).toContain(valuePart);
  });

  it('should throw an error if the element does not have the specified property value part within the timeout', async () => {
    const element = await getElement(page as never, '#element');
    const property = 'innerText';
    const valuePart = '10000';
    const timeoutMs = 1000;

    await expect(
      waitForElementToHavePropertyPart(
        page as never,
        element,
        property,
        valuePart,
        { timeoutMs },
      ),
    ).rejects.toThrowError(
      TestError.ElementDoesNotHavePropertyPart(property, valuePart, timeoutMs),
    );
  });
});
