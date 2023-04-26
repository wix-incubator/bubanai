import {
  dragTo,
  getBoundingBox,
  getElementStyle,
  getText,
  isBold,
} from '../../src';
import { pageContentWithDragElement } from './dragUtils.testKit';

describe('Drag: dragTo()', () => {
  let element;

  beforeAll(async () => {
    await page.setContent(pageContentWithDragElement);
    element = await page.waitForSelector('#dragMe');
  });

  it('should move element from one point to another', async () => {
    const from = await getBoundingBox(element);
    const to = { x: 100, y: 100 };
    await dragTo(page as never, from, to);

    const newPosition = await getBoundingBox(element);
    expect(newPosition.x - to.x).toBeLessThanOrEqual(1);
    expect(newPosition.y - to.y).toBeLessThanOrEqual(1);
    expect(await getElementStyle(page as never, element, 'opacity')).toEqual(
      '-2',
    );
  });

  it('should move element with steps', async () => {
    const from = await getBoundingBox(element);
    const to = { x: 100, y: 100 };
    const steps = 10;
    await dragTo(page as never, from, to, { steps, continuous: true });

    const newPosition = await getBoundingBox(element);
    expect(newPosition.x - to.x).toBeLessThanOrEqual(1);
    expect(newPosition.y - to.y).toBeLessThanOrEqual(1);
    expect(await getElementStyle(page as never, element, 'opacity')).toEqual(
      `${(steps + 1) * -2}`,
    );
  });

  it('should execute before and after mouse up actions during drag', async () => {
    const from = await getBoundingBox(element);
    const to = { x: 100, y: 100 };
    const innerHtml = '1';
    const opacity = 0.5;
    const options = {
      beforeMouseUpAction: () =>
        page.evaluate((e, t) => (e.innerHtml = t), element, innerHtml),
      afterMouseUpAction: () =>
        page.evaluate((e, o) => (e.style.opacity = o), element, opacity),
    };
    await dragTo(page as never, from, to, options);
    expect(await getElementStyle(page as never, element, 'opacity')).toEqual(
      `${opacity}`,
    );
    expect(await getText(page as never, element)).toEqual(innerHtml);
  });

  it('should move element with temp steps', async () => {
    const from = await getBoundingBox(element);
    const to = { x: 100, y: 100 };
    const innerHtml = '1';
    const fontWeight = 700;
    const tempSteps = [
      {
        point: {
          x: 20,
          y: 20,
        },
        action: () =>
          page.evaluate((e, t) => (e.innerHtml = t), element, innerHtml),
      },
      {
        point: {
          x: 40,
          y: 40,
        },
        action: () =>
          page.evaluate(
            (e, fw) => (e.style.fontWeight = fw),
            element,
            fontWeight,
          ),
      },
    ];
    await dragTo(page as never, from, to, { tempSteps });

    expect(await getText(page as never, element)).toEqual(innerHtml);
    expect(await isBold(page as never, '#dragMe')).toBe(true);
  });
});
