import { Point } from 'puppeteer-core';

export { Point };

/**
 * @property point target coordinates.
 * @property action async functions that is executed after moving to coordinates.
 */
export interface DragStep {
  point: Point;
  action?: () => Promise<void>;
}

/**
 * @property continuous if true - drag will be executed pixel by pixel dragPixelsAmount times if steps are not defined.
 * If steps is defined, it would be dragged to location by number of iterations that equal dragPixelsAmount / steps.
 * @property tempSteps Array of Points with actions. Allows to drag to alternative location before end location and do
 * action there before mouse.up().
 * Example of usage: You get element from panel, drag it to another location. Moving element outside panel triggers panel to be closed.
 * But you need element's location under panel, so you need it to be closed first.
 * @property beforeMouseUpAction Async function that is executed before mouse.up()
 * @property afterMouseUpAction Async function that is executed after mouse.up();
 * @property steps number of steps, in which complete drag would be executed.
 * Default - 1, if continuous is not enabled.
 */
export interface DragOptions {
  continuous?: boolean;
  tempSteps?: DragStep[];
  beforeMouseUpAction?: () => Promise<any>;
  afterMouseUpAction?: () => Promise<any>;
  steps?: number;
}
