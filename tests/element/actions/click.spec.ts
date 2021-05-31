import { click } from '../../../src/element/actions/click';

describe('Element Action: click()', () => {
  it('should add element by clicking and delete it', async () => {
    await page.goto('http://the-internet.herokuapp.com/add_remove_elements/');

    const addElementSelector = "[onclick = 'addElement()']";
    const deleteElementSelector = "[onclick = 'deleteElement()']";

    await click(page, addElementSelector);
    await click(page, deleteElementSelector);

    expect(await page.$$(deleteElementSelector)).toHaveLength(0);
  });

  it('should not click on the disabled button', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_controls');

    const buttonSelector = '#checkbox-example button';
    await click(page, buttonSelector);

    await expect(click(page, buttonSelector)).rejects.toThrowError(
      `the element with selector '${buttonSelector}' is disabled.`,
    );
  });
});
