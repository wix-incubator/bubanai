import {
  getElementFromArrayByContainingText,
  getText,
  TestError,
} from '../../../src';

describe('Collections Search: getElementFromArrayByContainingText()', () => {
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

  it('should return the element with by containing matching text', async () => {
    const text = 'Text2';
    const ignoreCase = false;

    const result = await getElementFromArrayByContainingText(
      page as never,
      'div',
      text,
      ignoreCase,
    );

    expect(await getText(page as never, result)).toBe('Text21');
  });

  it('should return the element with the exact matching text (ignore case)', async () => {
    const text = 'text';
    const ignoreCase = true;

    const result = await getElementFromArrayByContainingText(
      page as never,
      'div',
      text,
      ignoreCase,
    );

    expect(await getText(page as never, result)).toBe('Text1');
  });

  it('should throw an error if the element with the exact matching text is not found', async () => {
    const text = 'Text21 ';
    const ignoreCase = false;

    await expect(
      getElementFromArrayByContainingText(
        page as never,
        'div',
        text,
        ignoreCase,
      ),
    ).rejects.toThrowError(TestError.ContainedTextIsNotFoundInArray(text));
  });
});
