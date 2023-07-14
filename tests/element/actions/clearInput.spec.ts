import {
  clearInput,
  getElement,
  getFrameByName,
  getValue,
  TestError,
} from '../../../src';

describe('Element Actions: clearInput()', () => {
  let input;
  beforeEach(async () => {
    await page.reload();
    await page.setContent(`<html lang="en">
                                  <head>
                                    <title>Test Page</title>
                                  </head>
                                  <body>
                                    <input id="inputField" type="text" value="Sample Text" />
                                   <iframe name="newFrame" id="newFrame">
                                   </iframe>
                                   <script>
                                    const iframe = document.getElementById('newFrame');
                                    const iframeContent = \`
                                      <!DOCTYPE html>
                                      <html lang="en">
                                        <head>
                                          <title>Iframe Page</title>
                                        </head>
                                        <body>
                                          <input id="inputInFrame" type="text" value="Sample Text" />
                                        </body>
                                      </html>
                                    \`;
                                    iframe.contentDocument.open();
                                    iframe.contentDocument.write(iframeContent);
                                    iframe.contentDocument.close();
                                   </script>
                                  </body>
                                </html>`);
  });

  it('should clear the text from input field (page context)', async () => {
    input = await getElement(page as never, '#inputField');
    expect(await getValue(page as never, input)).not.toEqual('');
    await clearInput(page as never, input);

    const inputValue = await getValue(page as never, input);
    expect(inputValue).toBe('');
  });

  it('should clear the text from input field (frame context)', async () => {
    const frame = await getFrameByName(page as never, 'newFrame');
    input = await getElement(frame, '#inputInFrame');
    expect(await getValue(frame, input)).not.toEqual('');
    await clearInput(frame, input, undefined, page as never);

    const inputValue = await getValue(frame, input);
    expect(inputValue).toBe('');
  });

  it('should throw error for context mismatch', async () => {
    const frame = await getFrameByName(page as never, 'newFrame');
    input = await getElement(frame, '#inputInFrame');
    await expect(clearInput(frame, input)).rejects.toThrowError(
      TestError.PageArgumentIsNotPassed(),
    );
  });
});
