import type { DocumentContext } from '../page';
import { scrollTo } from './scrollTo';

/**
 * Scroll the page or frame to the top
 *
 * @category Scroll
 */
export async function scrollToTop(context: DocumentContext) {
  await scrollTo(context, 0);
}
