import { Point } from 'puppeteer-core';

export { Point };

export interface DragStep {
  point: Point;
  action?: () => Promise<void>;
}

export interface DragOptions {
  continuous?: boolean;
  tempSteps?: DragStep[];
  beforeMouseUpAction?: () => Promise<void>;
  afterMouseUpAction?: () => Promise<void>;
}
