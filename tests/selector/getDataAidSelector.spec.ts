import {
  AttributeMatcher,
  AttributeType,
  getDataAidSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getDataAidSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.CONTAINS;
    getDataAidSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.DATA_AID,
      attributeMatcher,
    );
  });
});
