import { ElementHandle } from 'puppeteer-core';

export async function hasClass(element: ElementHandle, className: string) {
  const classNames = (await (
    await element.getProperty('className')
  ).jsonValue()) as string;
  return classNames.includes(className);
}
