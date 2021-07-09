/**
 * Builds the CSS selector based on the provide data-hook value.
 */
export function getSelectorByDataHook(dataHook: string): string {
  return `[data-hook="${dataHook}"]`;
}

/**
 * Builds the CSS selector based on the provide name value.
 */
export function getSelectorByName(name: string): string {
  return `[name="${name}"]`;
}
