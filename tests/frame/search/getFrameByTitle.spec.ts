import { getFrameByTitle } from '../../../src';

describe('Frame Search: getFrameByTitle()', () => {
  beforeAll(async () => {
    await page.setContent(
      `
        <html lang="en">
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
        <iframe src="https://example.com" title="example">
        </iframe>
        </body>
        </html>`,
    );
  });

  it('should get frame by title', async () => {
    const result = await getFrameByTitle(page as never, 'example');
    expect(result.url()).toEqual('https://example.com/');
  });
});
