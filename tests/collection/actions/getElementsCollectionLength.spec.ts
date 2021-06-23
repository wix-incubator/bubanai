import { getElementsCollectionLength } from '../../../src/collection/actions/getElementsCollectionLength';

describe('Collection Action: getElementsCollectionLength()', () => {
  it('should find the elements collection length', async () => {
    const expectedLength = 7;
    const headerSelector = 'tr th';

    await page.goto('http://the-internet.herokuapp.com/challenging_dom');

    const collectionLength = await getElementsCollectionLength(
      page,
      headerSelector,
    );

    expect(collectionLength).toBe(expectedLength);
  });
});
