import { ElementHandle } from 'puppeteer-core';

/**
 * Checks if element contains class.
 * @param element Element or selector
 * @param className Class name
 *
 * @category Element States
 */
export async function hasClass(element: ElementHandle, className: string) {
  const classNames = (await (
    await element.getProperty('className')
  ).jsonValue()) as string;
  return classNames.includes(className);
}
