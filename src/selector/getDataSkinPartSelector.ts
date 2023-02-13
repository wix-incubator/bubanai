import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

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
