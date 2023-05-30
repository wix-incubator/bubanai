import { getElement, getY } from '../../src';

describe('BoundingBox: getY()', () => {
  it('should get y coordinates of a bounding box object', async () => {
    await page.setContent(
      '<div id="myElement" style="width: 200.5px; height: 100px;"></div>',
    );
    const element = await getElement(page as never, '#myElement');
    const result = await getY(element);
    expect(result).toEqual(8);
  });
});
