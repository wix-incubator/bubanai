import { DocumentContext } from '../page';
import { waitForScrollToBeFinished } from './waitForScrollToBeFinished';

/**
 * Vertical scrolls to y coordinate and waits for scroll to be finished.
 * @param context
 * @param height
 *
 * @category Scroll
 */
export async function scrollTo(context: DocumentContext, height: number) {
  await context.evaluate((_height) => {
    window.scroll(0, _height);
  }, height);
  await waitForScrollToBeFinished(context);
}
