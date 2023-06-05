import {
  AttributeMatcher,
  AttributeType,
  getDataIdSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getDataIdSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.STARTS_WITH;
    getDataIdSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.DATA_ID,
      attributeMatcher,
    );
  });
});
