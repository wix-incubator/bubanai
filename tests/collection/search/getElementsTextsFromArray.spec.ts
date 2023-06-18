import { getElementsTextsFromArray } from '../../../src';

describe('Collections Search: getElementsTextsFromArray()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html>
            <head>
            </head>
            <body>
              <div>Text1</div>
              <div><span>Text2</span></div>
              <div></div>
              <div>t0$</div>
            </body>
            </html>`,
    );
  });

  it('should get elements texts', async () => {
    const texts = await getElementsTextsFromArray(page as never, 'div');
    expect(texts).toEqual(['Text1', 'Text2', '', 't0$']);
  });
});
