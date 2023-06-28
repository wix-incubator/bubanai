import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import type { AttributeMatcher } from './types';
import { AttributeType } from './types';

/**
 * Returns data-hook selector string.
 * Supports `=, *=, ^=, $=` matchers.
 * @param key Selector value string
 * @param attributeMatcher Matcher
 *
 * @example `getDataHookSelector('open', AttributeMatcher.CONTAINS)` returns `[data-hook*=open]`
 *
 * @category Selectors
 */
export function getDataHookSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.DATA_HOOK,
    attributeMatcher,
  );
}
