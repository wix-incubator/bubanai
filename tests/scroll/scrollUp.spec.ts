import { getScroll, scrollToBottom, scrollUp } from '../../src';

describe('Scroll: scrollUp()', () => {
  it('should scroll up after scroll down', async () => {
    await page.setContent(`<html>
            <head>
              <style>
              body {
                 margin: 0;
                 padding: 0;
              }
              .bigElement {
                  height: 200vh;
                }
              </style>
            </head>
            <body>
              <div class="bigElement">
              </div>
            </body>
            </html>`);

    await scrollToBottom(page as any);
    const scrollBy = 10;
    const scroll = await getScroll(page as never);
    await scrollUp(page as never, scrollBy);
    expect(await getScroll(page as never)).toEqual({
      ...scroll,
      y: scroll.y - scrollBy,
    });
  });
});
