import { click } from '../click';

describe('Click action', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/add_remove_elements/');
  });

  it('should add element by clicking and delete it', async () => {
    const addElementSelector = "[onclick = 'addElement()']";
    const deleteElementSelector = "[onclick = 'deleteElement()']";

    await click(page, addElementSelector);
    await click(page, deleteElementSelector);

    expect(await page.$$(deleteElementSelector)).toHaveLength(0);
  });
});
