import { BoundingBox } from 'puppeteer';

export function getElementVisibleBoundingBox(
  element: BoundingBox,
  viewport: BoundingBox,
): BoundingBox | null {
  if (!boxesOverlap(element, viewport)) {
    return null;
  }

  const left = Math.max(element.x, viewport.x);
  const top = Math.max(element.y, viewport.y);
  const right = Math.min(
    element.x + element.width,
    viewport.x + viewport.width,
  );
  const bottom = Math.min(
    element.y + element.height,
    viewport.y + viewport.height,
  );
  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

function boxesOverlap(a: BoundingBox, b: BoundingBox): boolean {
  if (
    a.x + a.width < b.x ||
    b.x + b.width < a.x ||
    a.y + a.height < b.y ||
    b.y + b.height < a.y
  ) {
    return false;
  }

  return true;
}
