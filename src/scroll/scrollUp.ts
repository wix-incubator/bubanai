import { DocumentContext } from '../page';
import { getScroll } from './getScroll';
import { scrollTo } from './scrollTo';

/**
 * Scrolls the page or frame up by defined value
 *
 * @category Scroll
 */
export async function scrollUp(context: DocumentContext, byY: number) {
  const { y } = await getScroll(context);
  await scrollTo(context, y - byY);
}
