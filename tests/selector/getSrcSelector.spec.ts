import {
  AttributeMatcher,
  AttributeType,
  getSrcSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getSrcSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.EQUALS;
    getSrcSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.SRC,
      attributeMatcher,
    );
  });
});
