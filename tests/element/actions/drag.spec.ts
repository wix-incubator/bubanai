import { dragElementToElement } from '../../../src/element/actions/drag';
import { getElement } from '../../../src/element/getElement';
import { getText } from '../../../src/element/actions/getText';

describe('Element Action: drag()', () => {
  const firstElementSelector = '#column-a';
  const secondElementSelector = '#column-b';
  const TEXT_A = 'A';
  const TEXT_B = 'B';

  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/drag_and_drop');
  });

  it('should drag one element to another', async () => {
    const firstElement = await getElement(page, firstElementSelector);
    const secondElement = await getElement(page, secondElementSelector);

    await dragElementToElement(page, firstElement, secondElement, true);

    const actualFirstText = await getText(page, firstElementSelector);
    const actualSecondText = await getText(page, secondElementSelector);
    expect(actualFirstText).toBe(TEXT_B);
    expect(actualSecondText).toBe(TEXT_A);
  });
});
