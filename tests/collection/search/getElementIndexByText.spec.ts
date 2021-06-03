import { getElementIndexByText } from '../../../src/collection/search/getElementIndexByText';

describe('Collection Search: getElementIndexByText()', () => {
  const headerSelector = 'tr th';

  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/challenging_dom');
  });

  it('should find the index of the table header by text', async () => {
    const expectedIndex = 4;
    const searchText = 'Amet';

    const searchedIndex = await getElementIndexByText(
      searchText,
      page,
      headerSelector,
    );

    expect(searchedIndex).toBe(expectedIndex);
  });

  it('should find the index of the table header by text ignoring a case', async () => {
    const expectedIndex = 5;
    const searchText = 'diceret';

    const searchedIndex = await getElementIndexByText(
      searchText,
      page,
      headerSelector,
      {},
      true,
    );

    expect(searchedIndex).toBe(expectedIndex);
  });

  it('should find the index of the table header by text using the existing elements collection', async () => {
    const expectedIndex = 1;
    const searchText = 'Ipsum';
    const elements = await page.$$(headerSelector);

    const searchedIndex = await getElementIndexByText(
      searchText,
      page,
      elements,
    );

    expect(searchedIndex).toBe(expectedIndex);
  });
});
