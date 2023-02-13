import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

export function getRoleSelector(
  key: string,
  attributeMatcher?: AttributeMatcher,
) {
  return getSelectorWithAttributeType(
    key,
    AttributeType.ROLE,
    attributeMatcher,
  );
}
