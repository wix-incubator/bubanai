import { DocumentContext } from '../page';
import { waitForValueToStopChanging } from '../waits';
import { ACTION_TIMEOUT } from '../settings';
import { getScroll } from './getScroll';

export async function waitForScrollToBeFinished(context: DocumentContext) {
  return waitForValueToStopChanging(
    () => getScroll(context).then((scroll) => scroll.y),
    ACTION_TIMEOUT,
    300,
  );
}
