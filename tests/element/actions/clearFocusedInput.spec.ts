import { clearFocusedInput, getElement, getValue } from '../../../src';

describe('Element Actions: clearFocusedInput()', () => {
  let input;
  beforeAll(async () => {
    await page.setContent(`<html lang="en">
                                  <head>
                                    <title>Test Page</title>
                                  </head>
                                  <body>
                                    <input id="inputField" type="text" value="Sample Text" />
                                  </body>
                                </html>`);
    input = await getElement(page as never, '#inputField');
  });

  it('should clear the text from the focused input field', async () => {
    expect(await getValue(page as never, input)).not.toEqual('');
    await input.click();
    await clearFocusedInput(page as never);

    const inputValue = await getValue(page as never, input);
    expect(inputValue).toBe('');
  });
});
