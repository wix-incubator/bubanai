import { getElementIndexByContainingText } from '../../../src';

describe('Collections Search: getElementIndexByContainingText()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html lang="en">
        <head>
         <title>Test</title>
        </head>
        <body>
          <div>Text1</div>
          <div>Text21</div>
          <div>Text3</div>
        </body>
      </html>`,
    );
  });

  it('should return the index of the element that contains the specified text', async () => {
    const selector = '//div';
    const text = 'Text2';
    const ignoreCase = false;

    const result = await getElementIndexByContainingText(
      page as never,
      selector,
      text,
      ignoreCase,
    );

    expect(result).toBe(1);
  });

  it('should return the index of the element that contains the specified text (case-insensitive)', async () => {
    const selector = 'div';
    const text = 'text2';
    const ignoreCase = true;

    const result = await getElementIndexByContainingText(
      page as never,
      selector,
      text,
      ignoreCase,
    );

    expect(result).toBe(1);
  });

  it('should return -1 if text is not found', async () => {
    const selector = 'div[class]';
    const text = 'text3';

    const result = await getElementIndexByContainingText(
      page as never,
      selector,
      text,
    );

    expect(result).toBe(-1);
  });
});
