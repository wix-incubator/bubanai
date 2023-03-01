import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';
/**
 * Returns data-reactid selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataReactIdSelector('open', AttributeMatcher.CONTAINS)` returns `[data-reactid*=open]`
 *
 * @category Selectors
 */
export function getDataReactIdSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_REACTID,
    attributeMatcher,
  );
}
