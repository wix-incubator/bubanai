import {
  getSelectorByDataHook,
  getSelectorByName,
} from '../../src/element/getSelector';

describe('Element Other: getSelector()', () => {
  it('should return selector wrapped in data-hook', async () => {
    const dataHook = 'something-interesting';
    const expectedSelector = `[data-hook="${dataHook}"]`;
    expect(getSelectorByDataHook(dataHook)).toBe(expectedSelector);
  });

  it('should return selector wrapped in name attribute', async () => {
    const name = 'some-name';
    const expectedSelector = `[name="${name}"]`;
    expect(getSelectorByName(name)).toBe(expectedSelector);
  });
});
