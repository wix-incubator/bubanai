import {
  AttributeMatcher,
  AttributeType,
  getDataReactIdSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getDataReactIdSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.EQUALS;
    getDataReactIdSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.DATA_REACTID,
      attributeMatcher,
    );
  });
});
