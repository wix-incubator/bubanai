import type { AttributeType } from './types';
import { AttributeMatcher } from './types';

/**
 * Returns selector string by attribute type with ignore case.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeType Attribute type
 * @param attributeMatcher Matcher
 *
 * @category Selectors
 */
export function getSelectorWithAttributeType(
  key: string,
  attributeType: AttributeType,
  attributeMatcher?: AttributeMatcher,
) {
  const attributeMatcherString = attributeMatcher
    ? attributeMatcher
    : AttributeMatcher.EQUALS;
  return `[${attributeType}${attributeMatcherString}"${key}" i]`;
}
