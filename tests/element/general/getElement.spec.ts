import { getElement } from '../../../src';

describe('Element General: getElement()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>getElement Example</title>
        </head>
        <body>
          <div id="element"></div>
          <div id="hiddenElement" style="display: block;">
            This element will be hidden after 2 seconds.
          </div>
          <script>
            setTimeout(() => {
              let element = document.getElementById('element');
              element.innerText = 'Hello';
              element.setAttribute('data-test', 'test-attribute');

              let hiddenElement = document.getElementById('hiddenElement');
              hiddenElement.style.display = 'none';
            }, 2000);
          </script>
        </body>
      </html>

    `);
  });

  it('should return the element when given an ElementHandle', async () => {
    const elementHandle = await page.waitForSelector('#element');
    const result = await getElement(page as never, elementHandle as never);

    expect(result).toBe(elementHandle);
  });

  it('should return the element when given a valid xpath selector', async () => {
    const selector = `//*[text()='Hello']`;
    const result = await getElement(page as never, selector);

    expect(result).toBeTruthy();
  });

  it('should return the element when given a valid css selector', async () => {
    const selector = `[data-test=test-attribute]`;
    const result = await getElement(page as never, selector);

    expect(result).toBeTruthy();
  });

  it('should throw an error if the element with the selector is not found', async () => {
    const nonExistentSelector = '#non_existent_element';

    await expect(
      getElement(page as never, nonExistentSelector, { timeout: 1000 }),
    ).rejects.toThrow();
  });

  it('should wait for element to be hidden', async () => {
    const result = await getElement(page as never, '#hiddenElement', {
      hidden: true,
    });

    expect(result).toBeTruthy();
  });
});
