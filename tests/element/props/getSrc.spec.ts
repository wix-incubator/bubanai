import { getSrc } from '../../../src';

describe('Element Properties: getSrc()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html>
            <head>
            </head>
            <body>
              <div class="withoutSrc"></div>
              <video class="withSrc" src="https://google.com"></video>
            </body>
            </html>`,
    );
  });

  it('should return the src property of the specified element', async () => {
    const result = await getSrc(page as never, '.withSrc');
    expect(result).toBe('https://google.com/');
  });

  it('should return undefined if src property does not exist', async () => {
    const result = await getSrc(page as never, '.withoutSrc');
    expect(result).toBeUndefined();
  });
});
