import {
  AttributeMatcher,
  AttributeType,
  getClassSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getClassSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.CONTAINS;
    getClassSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.CLASS,
      attributeMatcher,
    );
  });

  it('should return class attribute call for equals condition', () => {
    const key = 'value';
    expect(getClassSelector(key)).toEqual(`.${key}`);
  });
});
