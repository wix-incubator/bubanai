import { getElement, getX } from '../../src';

describe('Bounding Box: getX()', () => {
  it('should get x coordinates of a bounding box object', async () => {
    await page.setContent(
      '<div id="myElement" style="width: 200.5px; height: 100px;"></div>',
    );
    const element = await getElement(page as never, '#myElement');
    const result = await getX(element);
    expect(result).toEqual(8);
  });
});
