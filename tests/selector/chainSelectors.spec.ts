import { chainSelectors } from '../../src';

describe('Selectors: chainSelectors()', () => {
  it('should chain two selector', () => {
    const first = 'value';
    const second = 'secondVal';
    expect(chainSelectors(first)(second)).toEqual(`${first} ${second}`);
  });
});
