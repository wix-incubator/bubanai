import { ElementPropertyType, getElementIndexByProperty } from '../../../src';

describe('Collections Search: getElementIndexByProperty()', () => {
  beforeAll(async () => {
    await page.setContent(
      `<html>
        <head>
        </head>
        <body>
          <div id="element1" class="class1">Text1</div>
          <div id="element2" class="class2">Text2</div>
          <div id="element3" class="class1">Text3</div>
          <input type="checkbox" checked>
        </body>
      </html>`,
    );
  });

  it('should return the index of the element with the exact property value', async () => {
    const property = 'id';
    const value = 'element2';

    const result = await getElementIndexByProperty(
      page as never,
      'div',
      property,
      value,
    );

    expect(result).toBe(1);
  });

  it('should return the index of the element with the exact property value (className)', async () => {
    const property = 'className';
    const value = 'class1';

    const result = await getElementIndexByProperty(
      page as never,
      'div',
      property,
      value,
    );

    expect(result).toBe(0);
  });

  it('should return the index of the element with the exact property value (checked)', async () => {
    const property = ElementPropertyType.checked;

    const result = await getElementIndexByProperty(
      page as never,
      'input',
      property,
      true,
    );

    expect(result).toBe(0);
  });

  it('should return -1 if the element with the property value is not found', async () => {
    const property = 'id';
    const value = 'nonexistent';

    const result = await getElementIndexByProperty(
      page as never,
      'div',
      property,
      value,
    );

    expect(result).toBe(-1);
  });
});
