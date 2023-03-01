import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

/**
 * Returns data-comp-id selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataCompIdSelector('open', AttributeMatcher.CONTAINS)` returns `[data-comp-id*=open]`
 *
 * @category Selectors
 */
export function getDataCompIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_COMP_ID,
    attributeMatcher,
  );
}
