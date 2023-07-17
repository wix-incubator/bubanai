import { waitForElementToBeInViewport } from '../../../src';

describe('Element Waits: waitForElementToBeInViewport()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/large');
  });

  it('should not fail by timeout if the element is in the viewport', async () => {
    const headerSelector = 'h3';

    await waitForElementToBeInViewport(page as never, headerSelector);
    expect(true).toBeTruthy();
  });

  it('should fail by timeout if the element is not in the viewport', async () => {
    let isTimeout = false;
    const tableSelector = '#large-table';

    try {
      await waitForElementToBeInViewport(page as never, tableSelector, {
        timeoutMs: 2000,
      });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
