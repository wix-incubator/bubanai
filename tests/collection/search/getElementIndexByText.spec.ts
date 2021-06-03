import { getElementIndexByText } from '../../../src/collection/search/getElementIndexByText';

describe('Collection Search: getElementIndexByText()', () => {
  beforeAll(async () => {
    await page.goto('http://the-internet.herokuapp.com/challenging_dom');
  });

  it('should find the index of the table header by text', async () => {
    const expectedIndex = 4;

    const searchedIndex = await getElementIndexByText('Amet', page, 'tr th');

    expect(searchedIndex).toBe(expectedIndex);
  });

  it('should find the index of the table header by text ignoring a case', async () => {
    const expectedIndex = 5;

    const searchedIndex = await getElementIndexByText(
      'diceret',
      page,
      'tr th',
      {},
      true,
    );

    expect(searchedIndex).toBe(expectedIndex);
  });
});
