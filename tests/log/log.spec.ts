import { log, makeLoggable } from '../../src';
import { ConsoleLogger } from '../../src/log/loggerFactory';
import type { Page } from 'puppeteer';

type ComplicatedObject = {
  property1: {
    property2: {
      _page: Record<string, unknown>;
      property3: {
        class: string;
        spec: LogSpec;
      };
    };
    array: string[];
  };
};

type CircularType = { a: number; x: any };

class LogSpec {
  @log
  async method1() {
    return null;
  }

  @log
  async withArguments(
    str: string,
    array: (string | number)[],
    obj: { a: boolean },
  ) {
    return obj;
  }

  @log
  async withComplicatedObject(obj: ComplicatedObject) {
    return obj;
  }

  @log
  async circularStructure(obj: CircularType) {
    return obj;
  }

  @log
  async pageObject(_page: Page) {
    return _page;
  }
}
describe('Log: @log', () => {
  let loggerSpy: jest.SpyInstance<void>;
  const classInstance = LogSpec;

  beforeEach(() => {
    // Replace the logger with a spy before each test
    loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    // Restore the original logger after each test
    loggerSpy.mockRestore();
  });

  it('logs method name without arguments on function call', async () => {
    const result = await new classInstance().method1();

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Calling ${classInstance.name}.method1();`),
    );
    expect(result).toBe(null);
  });

  it('logs method name with arguments on function call', async () => {
    const firstArg = '1';
    const secondArg = [1, '2'];
    const thirdArg = { a: true };
    const result = await new classInstance().withArguments(
      firstArg,
      secondArg,
      thirdArg,
    );

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `Calling ${classInstance.name}.withArguments(${JSON.stringify(
          firstArg,
        )}, ${JSON.stringify(secondArg)}, ${JSON.stringify(thirdArg)});`,
      ),
    );
    expect(result).toBe(thirdArg);
  });

  it('logs method name with complicated object', async () => {
    const className = 'myClass 1';
    const array = ['1', '2', '3'];
    const complicatedObject = makeLoggable({
      OBJECT_CONTAINER: {
        property1: {
          property2: {
            _page: { fn: jest.fn() },
            property3: {
              class: className,
              spec: new LogSpec(),
            },
          },
          array,
        },
      },
    });
    const result = await new classInstance().withComplicatedObject(
      complicatedObject.OBJECT_CONTAINER,
    );

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `Calling ${classInstance.name}.withComplicatedObject(OBJECT_CONTAINER);`,
      ),
    );
    expect(result).toEqual(complicatedObject.OBJECT_CONTAINER);
  });

  it('should not explode on objects with circular structure', async () => {
    const circularStructureObj: CircularType = { a: 1, x: null };
    circularStructureObj.x = circularStructureObj;
    const result = await new classInstance().circularStructure(
      circularStructureObj,
    );

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `Calling ${classInstance.name}.circularStructure(Object);`,
      ),
    );
    expect(result).toBe(circularStructureObj);
  });

  it('should return className for complicated object with defined constructor name', async () => {
    const result = await new classInstance().pageObject(page);

    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        `Calling ${classInstance.name}.pageObject(Page);`,
      ),
    );
    expect(result).toBe(page);
  });
});
