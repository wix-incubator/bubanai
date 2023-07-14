import { getElementIndexByText } from '../../../src';

describe('Collections Search: getElementIndexByText()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html lang="en">
        <head>
        </head>
        <body>
          <div>Text1</div>
          <div>Text21</div>
          <div>Text3</div>
        </body>
      </html>`,
    );
  });

  it('should return the index of the element that has specified text (exact match)', async () => {
    const selector = '//div';
    const text = 'Text3';
    const ignoreCase = false;

    const result = await getElementIndexByText(
      page as never,
      selector,
      text,
      ignoreCase,
    );

    expect(result).toBe(2);
  });

  it('should return the index of the element that has specified text (case-insensitive)', async () => {
    const selector = 'div';
    const text = 'text21';
    const ignoreCase = true;

    const result = await getElementIndexByText(
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

    const result = await getElementIndexByText(page as never, selector, text);

    expect(result).toBe(-1);
  });
});
