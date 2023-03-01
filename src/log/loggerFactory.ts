export interface Logger {
  log: (...message: any) => void;
}

export let logger: Logger;

/**
 * @category Loggers
 */
export class LoggerFactory {
  public static getInstance() {
    if (!logger) {
      logger = new ConsoleLogger();
    }
    return logger;
  }
}

/**
 * @category Loggers
 */
export class ConsoleLogger implements Logger {
  log(...message: any) {
    console.log(new Date(), ...message);
  }
}

logger = LoggerFactory.getInstance();
