import { Point } from 'puppeteer';

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
