import { getSelectorWithAttributeType, AttributeMatcher } from '../../src';

describe('Selectors: getSelectorWithAttributeType()', () => {
  it('should return selector with EQUALS attribute matcher when no attribute matcher is provided', () => {
    const key = 'value';
    const attributeType = 'data-key';
    const selector = getSelectorWithAttributeType(key, attributeType);
    expect(selector).toBe('[data-key="value" i]');
  });

  it('should return selector with CONTAINS attribute matcher', () => {
    const key = '1';
    const attributeType = 'data-key';
    const attributeMatcher = AttributeMatcher.CONTAINS;
    const selector = getSelectorWithAttributeType(
      key,
      attributeType,
      attributeMatcher,
    );
    expect(selector).toBe(`[${attributeType}*="${key}" i]`);
  });

  it('should return selector with EQUALS attribute matcher', () => {
    const key = 'value';
    const attributeType = 'data-val';
    const attributeMatcher = AttributeMatcher.EQUALS;
    const selector = getSelectorWithAttributeType(
      key,
      attributeType,
      attributeMatcher,
    );
    expect(selector).toBe(`[${attributeType}="${key}" i]`);
  });

  it('should return selector with STARTS_WITH attribute matcher', () => {
    const key = 'value';
    const attributeType = 'data-type';
    const attributeMatcher = AttributeMatcher.STARTS_WITH;
    const selector = getSelectorWithAttributeType(
      key,
      attributeType,
      attributeMatcher,
    );
    expect(selector).toBe(`[${attributeType}^="${key}" i]`);
  });

  it('should return selector with ENDS_WITH attribute matcher', () => {
    const key = '';
    const attributeType = 'data-key';
    const attributeMatcher = AttributeMatcher.ENDS_WITH;
    const selector = getSelectorWithAttributeType(
      key,
      attributeType,
      attributeMatcher,
    );
    expect(selector).toBe(`[${attributeType}$="${key}" i]`);
  });
});
