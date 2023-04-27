import { pageContentWithDragElement } from './dragUtils.testKit';
import { dragElementBy, getBoundingBox, getElement } from '../../src';

describe('Drag: dragElementBy()', () => {
  let element;

  beforeAll(async () => {
    await page.setContent(pageContentWithDragElement);
    element = await getElement(page as never, '#dragMe');
  });

  it('drags element by specified offsets', async () => {
    const initialPosition = await getBoundingBox(element);
    const byX = 50;
    const byY = 50;
    await dragElementBy(page as never, element, byX, byY);
    const finalPosition = await element.boundingBox();
    expect(finalPosition.x - initialPosition.x - byX).toBeLessThanOrEqual(1);
    expect(finalPosition.y - initialPosition.y - byY).toBeLessThanOrEqual(1);
  });
});
