import { getBoundingBox, getElement, TestError } from '../../src';

describe('Bounding Box: getBoundingBox()', () => {
  beforeAll(async () => {
    await page.setContent(
      '<div id="myElement" style="width: 200.5px; height: 100px;"></div>',
    );
  });

  it('should get bottom of a bounding box object', async () => {
    const element = await getElement(page as never, '#myElement');
    const result = await getBoundingBox(element);

    expect(result).toEqual({ x: 8, y: 8, height: 100, width: 200.5 });
  });

  it('should throw exception if element bounding does not exist', async () => {
    const element = await getElement(page as never, '#myElement');
    await page.setContent('<div></div>');
    await expect(getBoundingBox(element)).rejects.toThrow(
      TestError.BoundingBox(),
    );
  });
});
