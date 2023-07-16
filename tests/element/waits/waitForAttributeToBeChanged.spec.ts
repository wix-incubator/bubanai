import {
  getAttribute,
  TestError,
  type,
  wait,
  waitForAttributeToBeChanged,
} from '../../../src';

describe('Element Waits: waitForAttributeToBeChanged()', () => {
  const inputSelector = '#input';
  const getAttributeValue = async () =>
    getAttribute('value', page as never, 'input');

  beforeEach(async () => {
    await page.reload();
    await page.setContent(`
                 <html lang="en">
                  <head>
                    <title>Wait For Attribute Example</title>
                  </head>
                  <body>
                    <input type="text" id="input" value="initial" />
                    <script>
                      const inputElement = document.getElementById('input');
                      inputElement.addEventListener('input', () => {
                        inputElement.setAttribute('value', inputElement.value);
                      });
                    </script>
                  </body>
                </html>

    `);
  });

  it('should wait for the attribute value to be changed', async () => {
    const newValue = ' new value';
    const action = () => type(newValue, page as never, inputSelector);
    await waitForAttributeToBeChanged(
      page as never,
      inputSelector,
      'value',
      action,
      { timeoutMs: 2000 },
    );

    const attributeValue = await getAttributeValue();
    expect(attributeValue).toBe(newValue);
  });

  it('should throw an error if the attribute value does not change within the timeout', async () => {
    const action = () => wait(1000);
    const timeoutMs = 1500;

    await expect(
      waitForAttributeToBeChanged(
        page as never,
        inputSelector,
        'value',
        action,
        {
          timeoutMs,
        },
      ),
    ).rejects.toThrowError(
      TestError.AttributeWasNotChanged('value', action, timeoutMs),
    );

    const attributeValue = await getAttributeValue();
    expect(attributeValue).toBe('initial');
  });
});
