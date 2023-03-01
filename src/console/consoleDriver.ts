import { isEmpty, noop } from 'lodash';

import type {
  ConsoleMessageLocation,
  ConsoleMessageType,
  Page,
} from 'puppeteer-core';

interface ConsoleDriverMessage {
  type: ConsoleMessageType;
  text: string;
  location?: ConsoleMessageLocation;
  stack?: string;
}

/**
 * Console listener.
 * Makes message queue after instance creation.
 * Supports filtering messages by type.
 * Can be used for console message assertion or for wait for specific message.
 *
 * @category Console
 */
export class ConsoleDriver {
  private messagesQueue: ConsoleDriverMessage[] = [];
  private messageAwaiter?: MessageAwaiter;

  constructor(private readonly page: Page) {
    // documentation for events we can listen to:
    // https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#class-page

    // add listener for console logs (not very reliable, this is why we add more)
    this.page.on('console', async (message) => {
      const messagesFromArgs: string[] = await Promise.all(
        message.args().map((arg: any) =>
          arg
            .executionContext()
            .evaluate((msg: any) => {
              try {
                return msg.message || JSON.stringify(msg);
              } catch {
                return msg;
              }
            }, arg)
            .catch(() => ''),
        ),
      );
      const text = messagesFromArgs.filter((msg) => !isEmpty(msg));
      const messageItem = {
        type: message.type(),
        text: text.length > 0 ? text.join('\n') : message.text(),
        location: message.location(),
      };

      this._private_pushMessage(messageItem);

      if (this.messageAwaiter && this.messageAwaiter.testMessage(messageItem)) {
        this.messageAwaiter.resolve();
      }
    });

    // add listener for unhandled exceptions
    this.page.on('pageerror', (message) => {
      const messageItem = {
        type: 'error' as ConsoleMessageType,
        text: message.message,
        stack: message.stack,
      };

      this._private_pushMessage(messageItem);
    });

    // add listener for page crash (chrome tab crash?)
    this.page.on('error', (message) => {
      const messageItem = {
        type: 'error' as ConsoleMessageType,
        text: message.message,
        stack: message.stack,
      };

      this._private_pushMessage(messageItem);
    });
  }

  private _private_pushMessage(message: ConsoleDriverMessage) {
    this.messagesQueue.push(message);
  }

  /**
   * Clears message queue
   *
   * @category Console
   */
  clear() {
    this.messagesQueue = [];
  }

  /**
   * Returns all console messages, can be filtered by message type.
   * @param messageType
   *
   * @category Console
   */
  getMessages(messageType?: ConsoleMessageType) {
    if (!messageType) {
      return this.messagesQueue;
    }
    return this.messagesQueue.filter((message) => message.type === messageType);
  }

  /**
   * Waits for console method with defined text
   * @param message
   *
   * @category Console
   */
  waitForMessage(message: string) {
    this.messageAwaiter = new MessageAwaiter(message);
    return this.messageAwaiter.promise.then(() => {
      this.messageAwaiter = undefined;
    });
  }
}

class MessageAwaiter {
  promise: Promise<void>;
  private resolveCallback: () => void = noop;

  constructor(private readonly message: string) {
    this.promise = new Promise((resolve) => {
      this.resolveCallback = resolve;
    });
  }

  testMessage(msg: ConsoleDriverMessage) {
    return msg.text.includes(this.message);
  }

  resolve() {
    this.resolveCallback();
  }
}
