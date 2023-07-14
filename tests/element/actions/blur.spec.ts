import { blur, getElement } from '../../../src';

describe('Element Actions: blur()', () => {
  let input;
  beforeAll(async () => {
    await page.setContent(`
      <html lang="en">
        <head>
          <title>Test Page</title>
        </head>
        <body>
          <input id="inputField" type="text" value="Sample Text" />
        </body>
      </html>
    `);
    input = await getElement(page as never, '#inputField');
  });

  it('should remove keyboard focus from the element', async () => {
    await input.focus();
    expect(
      await page.evaluate((el) => document.activeElement === el, input),
    ).toBe(true);

    await blur(page as never, input);

    expect(
      await page.evaluate((el) => document.activeElement === el, input),
    ).toBe(false);
  });
});
