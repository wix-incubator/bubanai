import {
  DefaultWaitOptions,
  getFrameBoundingBox,
  getFrameByName,
  TestError,
} from '../../src';

describe('Bounding Box: getFrameBoundingBox()', () => {
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
            </body>
            </html>`,
    );
  });

  it('should get frame bounding box', async () => {
    const result = await getFrameBoundingBox(
      page as never,
      await getFrameByName(page as never, 'example'),
    );
    expect(result).toEqual({ x: 8, y: 8, height: 300, width: 200 });
  });

  it('should throw exception if frame does not exist', async () => {
    const missingFrameName = 'example';
    const frame = await getFrameByName(page as never, missingFrameName);
    await page.setContent('<div></div>');
    await expect(getFrameBoundingBox(page as never, frame)).rejects.toThrow(
      TestError.FrameWithNameWasNotFound(
        missingFrameName,
        DefaultWaitOptions.timeoutMs,
      ),
    );
  });
});
