import {
  ConsoleDriver,
  wait,
  waitForCollectionLengthToBe,
  waitForValueToStopChanging,
} from '../../src';
import { performance } from 'perf_hooks';

describe('Console: ConsoleDriver', () => {
  const sendLogMessage = (message: string) =>
    page.evaluate((m) => console.log(m), message);
  const sendErrorMessage = (message: string) =>
    page.evaluate((m) => console.error(m), message);

  describe('Console: getMessages()', () => {
    it('should get console messages', async () => {
      const messagesTexts = ['Demo!', 'Demo2'];
      const consoleDriver = new ConsoleDriver(page as never);
      await sendLogMessage(messagesTexts[0]);
      await sendLogMessage(messagesTexts[1]);
      await waitForValueToStopChanging(() =>
        Promise.resolve(consoleDriver.getMessages()),
      );
      const messages = consoleDriver.getMessages();
      expect(JSON.stringify(messages[1])).toContain(messagesTexts[1]);
      expect(JSON.stringify(messages[0])).toContain(messagesTexts[0]);
    });

    it('should get console messages with defined type', async () => {
      const messagesTexts = ['Demo!', 'Demo2'];
      const consoleDriver = new ConsoleDriver(page as never);
      await sendLogMessage(messagesTexts[0]);
      await sendErrorMessage(messagesTexts[1]);
      await waitForValueToStopChanging(() =>
        Promise.resolve(consoleDriver.getMessages()),
      );
      const messages = consoleDriver.getMessages('error');
      expect(messages.length).toBe(1);
      expect(JSON.stringify(messages[0])).toContain(messagesTexts[1]);
    });

    it('should return empty array if type was not found', async () => {
      const messagesTexts = ['Demo!', 'Demo2'];
      const consoleDriver = new ConsoleDriver(page as never);
      await sendLogMessage(messagesTexts[0]);
      await sendErrorMessage(messagesTexts[1]);
      await waitForValueToStopChanging(() =>
        Promise.resolve(consoleDriver.getMessages()),
      );
      expect(consoleDriver.getMessages()).not.toBe(0);
      const messages = consoleDriver.getMessages('warning');
      expect(messages.length).toBe(0);
    });
  });

  describe('Console: clear()', () => {
    it('should clear console', async () => {
      const messagesTexts = ['Demo!', 'Demo2'];
      const consoleDriver = new ConsoleDriver(page as never);
      await sendLogMessage(messagesTexts[0]);
      await sendErrorMessage(messagesTexts[1]);
      await waitForCollectionLengthToBe(
        () => Promise.resolve(consoleDriver.getMessages()),
        2,
      );

      await consoleDriver.clear();
      await waitForValueToStopChanging(() =>
        Promise.resolve(consoleDriver.getMessages()),
      );
      expect(consoleDriver.getMessages()).toHaveLength(0);
    });
  });

  describe('Console: waitForMessage()', () => {
    it('should wait for message', async () => {
      const timeout = 900;
      const consoleMessage = 'Demo2';
      const consoleDriver = new ConsoleDriver(page as never);
      expect(consoleDriver.getMessages()).toHaveLength(0);

      const setConsoleMessageWithDelay = async () => {
        await wait(timeout);
        await sendLogMessage(consoleMessage);
      };
      const startTime = performance.now();
      setConsoleMessageWithDelay();
      await consoleDriver.waitForMessage(consoleMessage);
      const endTime = performance.now();
      const waitTime = endTime - startTime;

      expect(consoleDriver.getMessages()).toHaveLength(1);
      expect(waitTime).toBeGreaterThanOrEqual(timeout);
      expect(waitTime).toBeLessThanOrEqual(timeout + 500);
    });
  });
});
