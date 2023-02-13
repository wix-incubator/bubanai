import { DocumentContext } from '../page';
import { waitForScrollToBeFinished } from './waitForScrollToBeFinished';

export async function scrollTo(context: DocumentContext, height: number) {
  await context.evaluate((_height) => {
    window.scroll(0, _height);
  }, height);
  await waitForScrollToBeFinished(context);
}
