import {
  getAttribute,
  TestError,
  type,
  waitForElementAttributeToStopChanging,
} from '../../../src';

describe('Element Waits: waitForElementAttributeToStopChanging()', () => {
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

  it('should wait for the attribute value to stop changing', async () => {
    const newValue = 'som';
    const action = () =>
      type(newValue, page as never, inputSelector, {}, { delayMs: 400 });
    action();
    await waitForElementAttributeToStopChanging(
      page as never,
      inputSelector,
      'value',
      { timeoutMs: 2000 },
    );

    const attributeValue = await getAttributeValue();
    expect(attributeValue).toBe(newValue);
  });

  it('should throw an error if the attribute value does not change within the timeout', async () => {
    const newValue = 'some';
    const action = () =>
      type(newValue, page as never, inputSelector, {}, { delayMs: 400 });
    const timeoutMs = 1500;
    const res = action();
    await expect(
      waitForElementAttributeToStopChanging(
        page as never,
        inputSelector,
        'value',
        {
          timeoutMs,
        },
      ),
    ).rejects.toThrowError(
      TestError.ValueToStopChanging('som', 'some', timeoutMs),
    );

    await res;
  });
});
