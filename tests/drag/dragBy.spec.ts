import { pageContentWithDragElement } from './dragUtils.testKit';
import { dragBy, getBoundingBox, getElement } from '../../src';

describe('Drag: dragBy()', () => {
  let element;

  beforeAll(async () => {
    await page.setContent(pageContentWithDragElement);
    element = await getElement(page as never, '#dragMe');
  });

  it('drags entity from point to point by specified offsets', async () => {
    const startBoundingBox = await getBoundingBox(element);

    const startLocation = {
      x: Math.round(startBoundingBox.x + startBoundingBox.width / 2),
      y: Math.round(startBoundingBox.y + startBoundingBox.height / 2),
    };

    await dragBy(page as never, startLocation, 50, 50);

    const endBoundingBox = await getBoundingBox(element);
    const endLocation = {
      x: Math.round(endBoundingBox.x + endBoundingBox.width / 2),
      y: Math.round(endBoundingBox.y + endBoundingBox.height / 2),
    };

    expect(endLocation).toEqual({
      x: startLocation.x + 50,
      y: startLocation.y + 50,
    });
  });
});
