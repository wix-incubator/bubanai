import {
  AttributeMatcher,
  AttributeType,
  getDataStateSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getDataStateSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.EQUALS;
    getDataStateSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.DATA_STATE,
      attributeMatcher,
    );
  });
});
