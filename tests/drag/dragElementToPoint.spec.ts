import { dragElementToPoint, getBoundingBox, getElement } from '../../src';
import { pageContentWithDragElement } from './dragUtils.testKit';

describe('Drag: dragElementToPoint()', () => {
  beforeAll(async () => {
    await page.setContent(pageContentWithDragElement);
  });

  it('should move initialized element from one point to another', async () => {
    const element = await getElement(page as never, '#dragMe');
    const endPoint = { x: 100, y: 100 };
    await dragElementToPoint(page as never, element, endPoint);
    const endLocation = await getBoundingBox(element).then((box) => ({
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    }));
    expect(endLocation.x - endPoint.x).toBeLessThanOrEqual(1);
    expect(endLocation.y - endPoint.y).toBeLessThanOrEqual(1);
  });

  it('should move not initialized element from one point to another', async () => {
    const endPoint = { x: 100, y: 100 };
    await dragElementToPoint(page as never, '#dragMe', endPoint);
    const endLocation = await getBoundingBox(
      await getElement(page as never, '#dragMe'),
    ).then((box) => ({
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    }));
    expect(endLocation.x - endPoint.x).toBeLessThanOrEqual(1);
    expect(endLocation.y - endPoint.y).toBeLessThanOrEqual(1);
  });
});
