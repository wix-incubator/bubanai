import { waitForScopedSelector, getElement } from '../../../src';
import type { ElementHandle } from 'puppeteer-core';

describe('Element Waits: waitForScopedSelector()', () => {
  let rootElement: ElementHandle;
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`<html lang="en">
                                  <head>
                                    <title>waitForScopedSelector Example</title>
                                  </head>
                                  <body>
                                    <div id="root"></div>
                                    <script>
                                      setTimeout(() => {
                                        const rootElement = document.getElementById('root');
                                        const internalElement = document.createElement('span');
                                        internalElement.setAttribute('id', 'element_1');
                                        internalElement.textContent = 'Element 1';
                                        rootElement.appendChild(internalElement);
                                      }, 1000);
                                    </script>
                                  </body>
                                </html>
`);
    rootElement = await getElement(page as never, '#root');
  });

  it('should wait for the internal element to be rendered', async () => {
    const scopedSelector = '#element_1';

    const internalElement = await waitForScopedSelector(
      page as never,
      rootElement,
      scopedSelector,
      { timeout: 2000 },
    );

    expect(internalElement).toBeTruthy();
    const textContent = await internalElement.evaluate((el) => el.textContent);
    expect(textContent).toBe('Element 1');
  });

  it('should throw an error if the internal element is not found within the timeout', async () => {
    const scopedSelector = '#non_existing_element';
    const timeoutMs = 1000;

    await expect(
      waitForScopedSelector(page as never, rootElement, scopedSelector, {
        timeout: timeoutMs,
      }),
    ).rejects.toThrowError();
  });

  it('should wait for the internal element with an XPath selector', async () => {
    const scopedXPathSelector = '//*[@id="element_1"]';

    const internalElement = await waitForScopedSelector(
      page as never,
      rootElement,
      scopedXPathSelector,
      { timeout: 2000 },
    );

    expect(internalElement).toBeTruthy();
    const textContent = await internalElement.evaluate((el) => el.textContent);
    expect(textContent).toBe('Element 1');
  });
});
