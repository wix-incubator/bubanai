import {
  AttributeMatcher,
  AttributeType,
  getDataAutomationIdSelector,
  getSelectorWithAttributeType,
} from '../../src';

jest.mock('../../src/selector/getSelectorWithAttributeType', () => ({
  ...jest.requireActual('../../src/selector/getSelectorWithAttributeType'),
  getSelectorWithAttributeType: jest.fn(),
}));

describe('Selectors: getDataAutomationIdSelector()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getSelectorWithAttributeType with key and provided attribute matcher', () => {
    const key = 'value';
    const attributeMatcher = AttributeMatcher.STARTS_WITH;
    getDataAutomationIdSelector(key, attributeMatcher);
    expect(getSelectorWithAttributeType).toHaveBeenCalledWith(
      key,
      AttributeType.DATA_AUTOMATION_ID,
      attributeMatcher,
    );
  });
});
