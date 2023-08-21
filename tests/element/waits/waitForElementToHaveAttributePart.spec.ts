import {
  waitForElementToHaveAttributePart,
  TestError,
  getAttribute,
  getElement,
  type,
} from '../../../src';

describe('Element Waits: waitForElementToHaveAttributePart()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToHaveAttributePart Example</title>
        </head>
        <body>
          <input type="text" id="input" value="initial" />
          <script>
            let inputField = document.getElementById('input');
            inputField.addEventListener('input', (event) => {
              const newValue = event.target.value;
              inputField.setAttribute('value', newValue);
            });
          </script>
        </body>
      </html>
    `);
  });

  it('should wait for the element to have the specified attribute value part', async () => {
    const inputElement = await getElement(page as never, '#input');
    const valuePart = '40';
    const changeAttributeValue = async () =>
      type('Te 40 ', page as never, inputElement, undefined, {
        delayMs: 300,
      });
    const delayedAction = changeAttributeValue();
    await waitForElementToHaveAttributePart(
      page as never,
      inputElement,
      'value',
      valuePart,
      {
        timeoutMs: 2000,
      },
    );

    const attributeValue = await getAttribute(
      'value',
      page as never,
      inputElement,
    );
    expect(attributeValue).toContain(valuePart);
    await delayedAction;
  });

  it('should throw an error if the element does not have the specified attribute value part within the timeout', async () => {
    const inputElement = await getElement(page as never, '#input');
    const timeoutMs = 1000;
    const notExistingValue = 'initial ';

    await expect(
      waitForElementToHaveAttributePart(
        page as never,
        inputElement,
        'value',
        notExistingValue,
        {
          timeoutMs,
        },
      ),
    ).rejects.toThrow(
      TestError.ElementDoesNotHaveAttributePart(
        'value',
        notExistingValue,
        timeoutMs,
      ),
    );
  });
});
