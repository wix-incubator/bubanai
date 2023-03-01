import { mapValues } from 'lodash';

/**
 * Returns floored numeric properties in object
 * @param boundingBox Object that contain only numeric props
 *
 * @category Bounding Box
 */
export const floorValues = <T extends { [K in keyof T]: number }>(
  boundingBox: T,
) => mapValues(boundingBox, Math.floor);
