import { isPlainObject } from 'lodash';
import { DISPLAY_NAME } from './types';

/**
 * Make complicated object to be simple and readable in logs.
 * Assigns property __DISPLAY_NAME: objectKey for each internal object
 * @param obj
 *
 * @example
 * `makeLoggable({` <br>
 *   `property1: {` <br>
 *     `property2: {` <br>
 *       `property3: {` <br>
 *         `prop4: 'str',` <br>
 *      ` },` <br>
 *    ` },` <br>
 *   `},` <br>
 * `})` <br>
 * would return <br>
 * `{` <br>
 *   `property1: {` <br>
 *     `property2: {` <br>
 *       `property3: {` <br>
 *         `prop4: 'str',` <br>
 *        `__DISPLAY_NAME: 'property3',` <br>
 *       `},` <br>
 *       `__DISPLAY_NAME: 'property2',` <br>
 *     `},` <br>
 *     `__DISPLAY_NAME: 'property1',` <br>
 *   `},` <br>
 * `}')`
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
