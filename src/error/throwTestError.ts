export function throwTestError(message: string, call: () => Promise<any>) {
  throw new Error(`${message} for function: \n ${call.toString()}`);
}
