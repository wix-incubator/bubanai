import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-option selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataOptionSelector('open', AttributeMatcher.CONTAINS)` returns `[data-option*=open]`
 *
 * @category Selectors
 */
export function getDataOptionSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_OPTION,
    attributeMatcher,
  );
}
