import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns src selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getSrcSelector('Open', AttributeMatcher.CONTAINS)` returns `[src*=open]`
 *
 * @category Selectors
 */
export function getSrcSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(key, AttributeType.SRC, attributeMatcher);
}
