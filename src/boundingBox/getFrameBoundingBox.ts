import { BoundingBox, Frame, Page } from 'puppeteer-core';

export function getFrameBoundingBox(
  page: Page,
  frame: Frame,
): Promise<BoundingBox> {
  return page.evaluate((frameNameOrId: string) => {
    const iframeElement =
      document.getElementById(frameNameOrId) ||
      document.getElementsByName(frameNameOrId)[0];

    if (!iframeElement) {
      throw new Error(`Could not find frame named "${frameNameOrId}"`);
    }

    const rect = iframeElement.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  }, frame.name());
}
