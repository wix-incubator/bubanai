import { LocalStorageDriver, TestError } from '../../src';

describe('Console: LocalStorageDriver', () => {
  let localStorageDriver: LocalStorageDriver;

  beforeEach(async () => {
    localStorageDriver = new LocalStorageDriver(page as never);
    await page.goto('https://example.com');
  });

  describe('Console: setItem()', () => {
    it('should set a value in local storage', async () => {
      const key = 'myKey';
      const value = 'myValue';

      await localStorageDriver.setItem(key, value);
      expect(await page.evaluate((k) => localStorage.getItem(k), key)).toEqual(
        value,
      );
    });
  });

  describe('Console: disableLocalStorage()', () => {
    it('should disable local storage', async () => {
      await localStorageDriver.disableLocalStorage();
      const key = 'myKey';
      const value = 'myValue';

      await expect(localStorageDriver.setItem(key, value)).rejects.toThrow(
        TestError.LocalStorageIsDisabled(),
      );
      await expect(
        page.evaluate((k) => localStorage.getItem(k), key),
      ).rejects.toThrow(TestError.LocalStorageIsDisabled());
    });
  });
});
