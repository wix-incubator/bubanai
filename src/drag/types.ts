import { Point } from 'puppeteer';

export interface DragStep {
  point: Point;
  action?: () => Promise<void>;
}
