import { getScroll } from '../../src';

describe('Scroll: getScroll()', () => {
  it('should get horizontal and vertical scroll', async () => {
    await page.setContent(`<html lang="en">
            <head>
              <style>
                 body {
                 margin: 0;
                 padding: 0;
                }
                .bigElement {
                  height: 200vh;
                  width: 200vw;
                }
              </style>
            </head>
            <body>
              <div class="bigElement">
              </div>
            </body>
            </html>`);
    const scroll = { x: 10, y: 11 };

    await page.evaluate(
      (height, width) => {
        window.scroll(width, height);
      },
      scroll.y,
      scroll.x,
    );

    expect(await getScroll(page as never)).toEqual(scroll);
  });
});
