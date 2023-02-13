import { DocumentContext } from '../page';
import { getScroll } from './getScroll';
import { scrollTo } from './scrollTo';

/**
 * scroll document of frame to the bottom
 */
export async function scrollToBottom(
  context: DocumentContext,
  continous?: boolean,
) {
  const pageHeight = await context.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
  });

  if (continous) {
    const scroll = await getScroll(context);
    const distance = pageHeight - scroll.y;

    if (distance > 0) {
      const interval = 50;
      const iterations = Math.floor(distance / interval);

      for (let i = 0; i < iterations; i++) {
        await scrollTo(context, scroll.y + i * interval);
      }
    }
  }
  await scrollTo(context, pageHeight);
}
