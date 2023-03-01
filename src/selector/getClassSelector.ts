import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

/**
 * Returns class selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getClassSelector('open', AttributeMatcher.CONTAINS)` returns `[class*=open]`
 *
 * @category Selectors
 */
export function getClassSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return attributeMatcher
    ? getSelectorWithAttributeType(key, AttributeType.CLASS, attributeMatcher)
    : `.${key}`;
}
