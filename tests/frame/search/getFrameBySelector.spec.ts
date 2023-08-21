import { getFrameBySelector, TestError } from '../../../src';

describe('Frame Search: getFrameBySelector()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html lang="en">
            <head>
              <style>
                .iframeClass {
                  width: 200px;
                  height: 300px;
                  border: none;
                }
              </style>
              <title>Test</title>
            </head>
            <body>
              <iframe src="https://example.com" class="iframeClass" name="example">
              </iframe>
              <div class="notIframe"></div>
              <video class="notExistingUrl" src="https://google.com"></video>
            </body>
            </html>`,
    );
  });

  it('should get frame by selector', async () => {
    const result = await getFrameBySelector(page as never, `//iframe`);
    expect(result.url()).toEqual('https://example.com/');
  });

  it('should throw exception if element does not have src', async () => {
    const timeoutMs = 1000;
    await expect(
      getFrameBySelector(page as never, '.notIframe', { timeoutMs }),
    ).rejects.toThrow(
      TestError.FrameWithUrlWasNotFound(JSON.stringify(null), timeoutMs),
    );
  });

  it('should throw exception if element src is not an src of iframe', async () => {
    const timeoutMs = 1000;
    await expect(
      getFrameBySelector(page as never, '.notExistingUrl', { timeoutMs }),
    ).rejects.toThrow(
      TestError.FrameWithUrlWasNotFound(
        JSON.stringify('https://google.com'),
        timeoutMs,
      ),
    );
  });
});
