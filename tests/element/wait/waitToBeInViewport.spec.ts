import { waitToBeInViewport } from '../../../src';

describe('Element Wait: waitToBeInViewport()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/large');
  });

  it('should not fail by timeout if the element is in the viewport', async () => {
    const headerSelector = 'h3';

    await waitToBeInViewport(page as never, headerSelector);
    expect(true).toBeTruthy();
  });

  it('should fail by timeout if the element is not in the viewport', async () => {
    let isTimeout = false;
    const tableSelector = '#large-table';

    try {
      await waitToBeInViewport(page as never, tableSelector, {
        timeoutMs: 2000,
      });
    } catch (e) {
      isTimeout = true;
    }
    expect(isTimeout).toBe(true);
  });
});
