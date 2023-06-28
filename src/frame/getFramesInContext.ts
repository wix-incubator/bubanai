import { isPage } from './types';
import type { DocumentContext } from '../page';

/**
 * Get frames in current context.
 * @param context
 *
 * @category Frame General
 */
export const getFrames = (context: DocumentContext) =>
  isPage(context) ? context.frames() : context.childFrames();
