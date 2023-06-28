import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-skinpart selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getSkinPartSelector('open', AttributeMatcher.CONTAINS)` returns `[data-skinpart*=open]`
 *
 * @category Selectors
 */
export function getSkinPartSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_SKINPART,
    attributeMatcher,
  );
}
