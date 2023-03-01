import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

/**
 * Returns data-testid selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataTestidSelector('open', AttributeMatcher.CONTAINS)` returns `[data-testid*=open]`
 *
 * @category Selectors
 */
export function getDataTestidSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_TEST_ID,
    attributeMatcher,
  );
}
