import { BoundingBox, ElementHandle, Page } from 'puppeteer';

export interface DragPoint {
  x: number;
  y: number;
}

/**
 * Performs drag-and-drop from one point to another.
 *
 * @category Element Actions
 */
export async function dragTo(
  page: Page,
  from: DragPoint,
  to: DragPoint,
  continuous?: boolean,
): Promise<void> {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await moveToCoordinates(page, from, to, continuous);
  await page.mouse.up();
}

/**
 * Performs drag-and-drop from element center to the specified point.
 *
 * @category Element Actions
 */
export async function dragElementToPoint(
  page: Page,
  fromElement: ElementHandle,
  to: DragPoint,
  continuous?: boolean,
): Promise<void> {
  const elementBoundingBox = await getBoundingBox(fromElement);
  const from = getCenter(elementBoundingBox);

  await dragTo(page, from, to, continuous);
}

/**
 * Performs drag-and-drop from one element to another.
 *
 * @category Element Actions
 */
export async function dragElementToElement(
  page: Page,
  fromElement: ElementHandle,
  toElement: ElementHandle,
  continuous?: boolean,
): Promise<void> {
  let elementBoundingBox = await getBoundingBox(fromElement);
  const from = getCenter(elementBoundingBox);

  elementBoundingBox = await getBoundingBox(toElement);
  const to = getCenter(elementBoundingBox);

  await dragTo(page, from, to, continuous);
}

/**
 * Performs drag-and-drop from the point by the specified number shift.
 *
 * @category Element Actions
 */
export async function dragBy(
  page: Page,
  from: DragPoint,
  byX: number,
  byY: number,
  continuous?: boolean,
): Promise<void> {
  const to = { x: from.x + byX, y: from.y + byY };
  await dragTo(page, from, to, continuous);
}

/**
 * Performs drag-and-drop from the element by the specified number shift.
 *
 * @category Element Actions
 */
export async function dragElementBy(
  page: Page,
  element: ElementHandle,
  byX: number,
  byY: number,
  continuous?: boolean,
): Promise<void> {
  const elementBoundingBox = await getBoundingBox(element);
  const from = getCenter(elementBoundingBox);
  const to = { x: from.x + byX, y: from.y + byY };

  await dragTo(page, from, to, continuous);
}

async function moveToCoordinates(
  page: Page,
  from: DragPoint,
  to: DragPoint,
  continuous?: boolean,
): Promise<void> {
  await page.mouse.move(to.x, from.y, {
    steps: continuous ? Math.abs(to.x - from.x) : 1,
  });
  await page.mouse.move(to.x, to.y, {
    steps: continuous ? Math.abs(to.y - from.y) : 1,
  });
}

function getCenter(box: BoundingBox): DragPoint {
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

async function getBoundingBox(element: ElementHandle): Promise<BoundingBox> {
  const box = await element.boundingBox();
  if (!box) {
    throw new Error('Failed to get bounding box.');
  }
  return box;
}
