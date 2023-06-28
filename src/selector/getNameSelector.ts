import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns name selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getNameSelector('open', AttributeMatcher.CONTAINS)` returns `[name*=open]`
 *
 * @category Selectors
 */
export function getNameSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.NAME,
    attributeMatcher,
  );
}
