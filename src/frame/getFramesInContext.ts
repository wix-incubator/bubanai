import { isPage } from './types';
import { DocumentContext } from '../page';

export const getFrames = (context: DocumentContext) =>
  isPage(context) ? context.frames() : context.childFrames();
