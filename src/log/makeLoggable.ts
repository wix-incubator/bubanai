import { isPlainObject } from 'lodash';
import { DISPLAY_NAME } from './types';

/**
 * Make complicated object to be simple and readable in logs.
 * Assigns property __DISPLAY_NAME: objectKey for each internal object
 * @param obj
 *
 * @example
 * 'makeLoggable({
 *   property1: {
 *     property2: {
 *       property3: {
 *         prop4: 'str',
 *       },
 *     },
 *   },
 * })'
 * would return
 * '{
 *   property1: {
 *     property2: {
 *       property3: {
 *         prop4: 'str',
 *         __DISPLAY_NAME: 'property3',
 *       },
 *       __DISPLAY_NAME: 'property2',
 *     },
 *     __DISPLAY_NAME: 'property1',
 *   },
 * }'
 *
 * @category Loggers
 */
export function makeLoggable<T extends Record<string, unknown>>(obj: T): T {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    if (isPlainObject(value)) {
      acc[key] = {
        ...makeLoggable(value as Record<string, unknown>),
        [DISPLAY_NAME]: key,
      };
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as T);
}
