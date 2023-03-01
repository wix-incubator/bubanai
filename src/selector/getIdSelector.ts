import { AttributeMatcher, AttributeType } from './types';
import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';

/**
 * Returns id selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getIdSelector('open', AttributeMatcher.CONTAINS)` returns `[id*=open]`
 *
 * @category Selectors
 */
export function getIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return attributeMatcher
    ? getSelectorWithAttributeType(key, AttributeType.ID, attributeMatcher)
    : `#${key}`;
}
