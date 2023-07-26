import { getElements } from '../../../src';

describe('Element General: getElements()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>getElements Example</title>
        </head>
        <body>
          <div id="element1"></div>
          <div class="element"></div>
          <div class="element"></div>
           <script>
            setTimeout(() => {
              let element = document.getElementById('element1');
              element.setAttribute('data-test', 'test-attribute');
            }, 1500);
          </script>
        </body>
      </html>
    `);
  });

  it('should return an array of elements based on the provided css selector', async () => {
    const elements = await getElements(page as never, '.element');
    expect(elements.length).toBe(2);
  });

  it('should return an array of elements based on the provided xpath selector', async () => {
    const elements = await getElements(page as never, `//*[@class='element']`);
    expect(elements.length).toBe(2);
  });

  it('should return an array of elements based on the provided elements', async () => {
    const element1 = await page.$$('#element1');
    const elements = await getElements(page as never, [element1] as never);
    expect(elements.length).toBe(1);
  });

  it('should wait for at least one element to be available if "shouldBeNotEmpty" option is set', async () => {
    const elements = await getElements(
      page as never,
      '[data-test=test-attribute]',
      {
        shouldBeNotEmpty: true,
      },
    );
    expect(elements.length).toBe(1);
  });

  it('should not wait if "shouldBeNotEmpty" option is not set', async () => {
    const elements = await getElements(
      page as never,
      '[data-test=test-attribute]',
    );
    expect(elements.length).toBe(0);
  });

  it('should return an empty array if no elements are found', async () => {
    const elements = await getElements(page as never, '.nonexistent-element');
    expect(elements.length).toBe(0);
  });
});
