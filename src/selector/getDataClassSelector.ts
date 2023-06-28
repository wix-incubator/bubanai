import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-class selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataClassSelector('open', AttributeMatcher.CONTAINS)` returns `[data-class*=open]`
 *
 * @category Selectors
 */
export function getDataClassSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_CLASS,
    attributeMatcher,
  );
}
