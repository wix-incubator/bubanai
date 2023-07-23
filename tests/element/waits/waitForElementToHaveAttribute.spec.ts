import {
  waitForElementToHaveAttribute,
  TestError,
  getAttribute,
  getElement,
  type,
} from '../../../src';

describe('Element Waits: waitForElementToHaveAttribute()', () => {
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
      <html lang="en">
        <head>
          <title>waitForElementToHaveAttribute Example</title>
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

  it('should wait for the element to have the specified attribute value', async () => {
    const inputElement = await getElement(page as never, '#input');
    const value = '400';
    const changeAttributeValue = async () =>
      type(value, page as never, inputElement, undefined, { delayMs: 300 });
    changeAttributeValue();
    await waitForElementToHaveAttribute(
      page as never,
      inputElement,
      'value',
      value,
      {
        timeoutMs: 1500,
      },
    );

    const attributeValue = await getAttribute(
      'value',
      page as never,
      inputElement,
    );
    expect(attributeValue).toBe(value);
  });

  it('should throw an error if the element does not have the specified attribute value within the timeout', async () => {
    const inputElement = await getElement(page as never, '#input');
    const timeoutMs = 1000;
    const value = 'initia';

    await expect(
      waitForElementToHaveAttribute(
        page as never,
        inputElement,
        'value',
        value,
        {
          timeoutMs,
        },
      ),
    ).rejects.toThrowError(
      TestError.ElementDoesNotHaveAttribute('value', value, timeoutMs),
    );
  });
});
