import { getElementFromArrayByText, getText, TestError } from '../../../src';

describe('Collections Search: getElementFromArrayByText()', () => {
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

  it('should return the element with the exact matching text', async () => {
    const text = 'Text21';
    const ignoreCase = false;

    const result = await getElementFromArrayByText(
      page as never,
      'div',
      text,
      ignoreCase,
    );

    expect(await getText(page as never, result)).toBe(text);
  });

  it('should return the element with the exact matching text (ignore case)', async () => {
    const text = 'text1';
    const ignoreCase = true;

    const result = await getElementFromArrayByText(
      page as never,
      'div',
      text,
      ignoreCase,
    );

    expect(await getText(page as never, result)).toBe('Text1');
  });

  it('should throw an error if the element with the exact matching text is not found', async () => {
    const text = 'Text2';
    const ignoreCase = false;

    await expect(
      getElementFromArrayByText(page as never, 'div', text, ignoreCase),
    ).rejects.toThrowError(TestError.ExactTextIsNotFoundInArray(text));
  });
});
