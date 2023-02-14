import { ElementHandle } from 'puppeteer-core';
import { hasClass } from './hasClass';

export async function isSelected(element: ElementHandle): Promise<boolean> {
  return hasClass(element, 'selected');
}
