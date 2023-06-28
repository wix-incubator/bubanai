import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns tab selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getTabSelector('Open', AttributeMatcher.CONTAINS)` returns `[tab*=open]`
 *
 * @category Selectors
 */
export function getTabSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(key, AttributeType.TAB, attributeMatcher);
}
