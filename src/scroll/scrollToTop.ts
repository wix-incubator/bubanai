/**
 * scroll the page or frame to the top
 */
import { DocumentContext } from '../page';
import { scrollTo } from './scrollTo';

export async function scrollToTop(context: DocumentContext) {
  await scrollTo(context, 0);
}
