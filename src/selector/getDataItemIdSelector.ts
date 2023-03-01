import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

/**
 * Returns data-item-id selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataItemIdSelector('open', AttributeMatcher.CONTAINS)` returns `[data-item-id*=open]`
 *
 * @category Selectors
 */
export function getDataItemIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_ITEM_ID,
    attributeMatcher,
  );
}
