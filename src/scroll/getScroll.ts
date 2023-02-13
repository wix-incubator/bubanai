import { Point } from 'puppeteer-core';
import { DocumentContext } from '../page';

export async function getScroll(context: DocumentContext): Promise<Point> {
  return context.evaluate(() => ({
    y: window.scrollY,
    x: window.scrollX,
  }));
}
