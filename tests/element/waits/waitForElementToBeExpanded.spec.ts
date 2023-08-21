import {
  getElement,
  isExpanded,
  TestError,
  wait,
  waitForElementToBeExpanded,
} from '../../../src';

describe('Element Waits: waitForElementToBeExpanded()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToBeExpanded Example</title>
          <style>
            .open {
              display: block;
            }
            .closed {
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="content closed">Some content</div>
          <button id="toggleButton">Toggle</button>
          <script>
            document.getElementById('toggleButton').addEventListener('click', function() {
              const content = document.querySelector('.content');
              content.classList.toggle('open');
              content.classList.toggle('closed');
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to be expanded', async () => {
    const toggleButton = await getElement(page as never, '#toggleButton');
    const contentElement = await getElement(page as never, '.content');
    let expanded = await isExpanded(contentElement);
    expect(expanded).toBe(false);

    const expand = async () => {
      await wait(1300);
      toggleButton.click();
    };
    expand();
    await waitForElementToBeExpanded(contentElement, { timeoutMs: 2000 });

    expanded = await isExpanded(contentElement);
    expect(expanded).toBe(true);
  });

  it('should throw an error if the element is not expanded within the timeout', async () => {
    const contentElement = await getElement(page as never, '.content');
    const timeoutMs = 900;

    await expect(
      waitForElementToBeExpanded(contentElement, { timeoutMs }),
    ).rejects.toThrow(TestError.ElementIsNotExpanded(timeoutMs));
  });
});
