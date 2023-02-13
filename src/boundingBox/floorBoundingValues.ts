import { mapValues } from 'lodash';

export const floorValues = <T extends { [K in keyof T]: number }>(
  boundingBox: T,
) => mapValues(boundingBox, Math.floor);
