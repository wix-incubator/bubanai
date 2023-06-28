import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-state selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataStateSelector('open', AttributeMatcher.CONTAINS)` returns `[data-state*=open]`
 *
 * @category Selectors
 */
export function getDataStateSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_STATE,
    attributeMatcher,
  );
}
