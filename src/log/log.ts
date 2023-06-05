import { isPlainObject } from 'lodash';
import { logger } from './loggerFactory';
import { DISPLAY_NAME } from './types';

export { logger };
/**
 * Logs class method.
 * Usage: put @log decorator above your class method.
 * Output would be in logs: '{timestamp} Calling ClassName.method(...args);'
 * @param target
 * @param propertyKey
 * @param descriptor
 *
 * @example
 * `@log` <br>
 * `async clickOnElement() {` <br>
 *   `return this.clickOnInternalElement(selector.element);` <br>
 * `}`
 *
 * @category Loggers
 */
export const log = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  if (!descriptor) {
    return;
  }

  const targetMethod = descriptor.value;
  descriptor.value = function <T>(...args: T[]) {
    logger.log(
      `Calling ${target.constructor.name}.${propertyKey}(${argsParser(
        args,
      ).join(', ')});`,
    );
    return targetMethod.apply(this, args);
  };

  return descriptor;
};

function argsParser(args: any[]): any {
  return args.map((arg) => {
    if (
      isPlainObject(arg) &&
      Object.prototype.hasOwnProperty.call(arg, DISPLAY_NAME)
    ) {
      return arg[DISPLAY_NAME];
    } else if (Array.isArray(arg)) {
      return `[${argsParser(arg)}]`;
    } else if (typeof arg === 'object' && arg.constructor.name !== 'Object') {
      return arg.constructor.name;
    } else {
      try {
        return JSON.stringify(arg);
      } catch (e) {
        return arg.constructor.name;
      }
    }
  });
}
