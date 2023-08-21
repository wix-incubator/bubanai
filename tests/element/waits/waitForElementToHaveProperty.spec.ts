import {
  waitForElementToHaveProperty,
  TestError,
  getElement,
  wait,
} from '../../../src';

describe('Element Waits: waitForElementToHaveProperty()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToHaveProperty Example</title>
        </head>
        <body>
          <input type="checkbox" id="checkbox" />
          <script>
            let checkboxElement = document.getElementById('checkbox');
            checkboxElement.addEventListener('input', (event) => {
              checkboxElement.checked = event.target.checked;
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to have the specified property value', async () => {
    const checkboxElement = await getElement(page as never, '#checkbox');
    const property = 'checked';
    const expectedValue = 'true';
    const changeProperty = async () => {
      await wait(700);
      await checkboxElement.click();
    };
    changeProperty();
    await waitForElementToHaveProperty(
      page as never,
      checkboxElement,
      property,
      expectedValue,
      {
        timeoutMs: 1500,
      },
    );

    const elementProperty = await checkboxElement.evaluate(
      (el, prop) => el[prop],
      property,
    );
    expect(elementProperty).toBe(true);
  });

  it('should throw an error if the element does not have the specified property value within the timeout', async () => {
    const checkboxElement = await getElement(page as never, '#checkbox');
    const property = 'checked';
    const timeoutMs = 1000;
    const expectedValue = 'true';

    await expect(
      waitForElementToHaveProperty(
        page as never,
        checkboxElement,
        property,
        expectedValue,
        {
          timeoutMs,
        },
      ),
    ).rejects.toThrow(
      await TestError.ObjectsToBeEqual(
        async () => 'false',
        expectedValue,
        timeoutMs,
      ),
    );
  });
});
