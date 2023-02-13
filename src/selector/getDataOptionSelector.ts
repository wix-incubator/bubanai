import { getSelectorWithAttributeType } from './getSelectorWithAttributeType';
import { AttributeMatcher, AttributeType } from './types';

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