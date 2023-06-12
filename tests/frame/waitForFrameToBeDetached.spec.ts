import {
  getFrameBySelector,
  TestError,
  wait,
  waitForFrameToBeDetached,
} from '../../src';
import { performance } from 'perf_hooks';

const htmlContent = `<html>
            <head>
              <style>
                .iframeClass {
                  width: 200px;
                  height: 300px;
                  border: none;
                }
              </style>
            </head>
            <body>
              <iframe src="https://example.com" class="iframeClass" name="example">
              </iframe>
            </body>
            </html>`;

describe('Frame Search: waitForFrameToBeDetached()', () => {
  it('resolves if iframe is detached after wait', async () => {
    await page.setContent(htmlContent);
    const actionTimeout = 1100;
    const pollIntervalMs = 500;
    const frame = await getFrameBySelector(page as never, '.iframeClass');
    let startTime;
    const detachFrameFunc = async () => {
      startTime = performance.now();
      await wait(actionTimeout);
      await page.setContent('<div></div>');
    };
    detachFrameFunc();
    await expect(
      waitForFrameToBeDetached(frame, {
        pollIntervalMs,
      }),
    ).resolves.toBeUndefined();
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThanOrEqual(
      actionTimeout + pollIntervalMs,
    );
  });

  it('rejects if frame is not detached after wait', async () => {
    await page.setContent(htmlContent);
    const frame = await getFrameBySelector(page as never, '.iframeClass');
    const timeoutMs = 1100;
    const pollIntervalMs = 500;
    const startTime = performance.now();
    await expect(
      waitForFrameToBeDetached(frame, {
        timeoutMs,
        pollIntervalMs,
      }),
    ).rejects.toThrowError(
      TestError.FrameWasNotDetached(frame.url(), timeoutMs),
    );
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThanOrEqual(timeoutMs + pollIntervalMs);
  });
});
