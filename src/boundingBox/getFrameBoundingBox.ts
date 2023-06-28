import type { BoundingBox, Frame, Page } from 'puppeteer-core';
import { TestError } from '../error';
import { DefaultWaitOptions } from '../types';

/**
 * Returns frame bounding box. Uses frame.name() as frame id first or frame.name() as name.
 * Useful for case, when you have instance of frame, but you don't know it's selector.
 * If frame does not exist - throws an exception.
 * @param page
 * @param frame
 *
 * @category Bounding Box
 */
export function getFrameBoundingBox(
  page: Page,
  frame: Frame,
): Promise<BoundingBox> {
  return page.evaluate(
    (frameNameOrId: string, error: string) => {
      const iframeElement =
        document.getElementById(frameNameOrId) ||
        document.getElementsByName(frameNameOrId)[0];

      if (!iframeElement) {
        throw new Error(error);
      }

      const rect = iframeElement.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    },
    frame.name(),
    TestError.FrameWithNameWasNotFound(
      frame.name(),
      DefaultWaitOptions.timeoutMs,
    ),
  );
}
