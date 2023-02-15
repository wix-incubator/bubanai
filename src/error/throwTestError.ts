export function throwTestError(
  message: string,
  call: (...args: any) => Promise<any> | any,
) {
  throw new Error(`${message} for function: \n ${call.toString()}`);
}
