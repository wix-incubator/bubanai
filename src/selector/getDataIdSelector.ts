import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

/**
 * Returns data-aid selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataIdSelector('open', AttributeMatcher.CONTAINS)` returns `[data-aid*=open]`
 *
 * @category Selectors
 */
export function getDataIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_ID,
    attributeMatcher,
  );
}
