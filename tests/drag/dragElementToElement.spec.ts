import { pageContentWithDragElement } from './dragUtils.testKit';
import { dragElementToElement, getBoundingBox, getElement } from '../../src';

describe('Drag: dragElementToElement()', () => {
  beforeAll(async () => {
    await page.setContent(pageContentWithDragElement);
  });

  it('drags element to another element', async () => {
    // Get the elements to drag and drop
    const fromElement = await getElement(page as never, '#dragMe');
    const toElement = await getElement(page as never, '#secondDiv');

    await dragElementToElement(page as never, fromElement, toElement);

    const fromElementFinalBoundingBox = await getBoundingBox(fromElement);
    const fromElementFinalCenter = {
      x: Math.ceil(
        fromElementFinalBoundingBox.x + fromElementFinalBoundingBox.width / 2,
      ),
      y: Math.ceil(
        fromElementFinalBoundingBox.y + fromElementFinalBoundingBox.height / 2,
      ),
    };
    const toElementFinalBoundingBox = await getBoundingBox(toElement);
    const toElementFinalCenter = {
      x: Math.ceil(
        toElementFinalBoundingBox.x + toElementFinalBoundingBox.width / 2,
      ),
      y: Math.ceil(
        toElementFinalBoundingBox.y + toElementFinalBoundingBox.height / 2,
      ),
    };

    expect(toElementFinalCenter).toEqual(fromElementFinalCenter);
  });
});
