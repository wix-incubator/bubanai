import { click } from '../../../src';

describe('Element Actions: click()', () => {
  it('should add element by clicking and delete it', async () => {
    await page.goto('http://the-internet.herokuapp.com/add_remove_elements/');

    const addElementSelector = "[onclick = 'addElement()']";
    const deleteElementSelector = "[onclick = 'deleteElement()']";

    await click(page as never, addElementSelector);
    await click(page as never, deleteElementSelector);

    expect(await page.$$(deleteElementSelector)).toHaveLength(0);
  });

  it('should not click on the disabled button', async () => {
    await page.goto('http://the-internet.herokuapp.com/dynamic_controls');

    const buttonSelector = '#checkbox-example button';
    await click(page as never, buttonSelector);

    await expect(click(page as never, buttonSelector)).rejects.toThrowError(
      `the element with selector '${buttonSelector}' is disabled.`,
    );
  });
});
