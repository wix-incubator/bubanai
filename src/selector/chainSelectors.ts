/**
 * Chain 2 selector
 * @param first
 *
 * @category Selectors
 */
export const chainSelectors = (first: string) => (second: string) =>
  `${first} ${second}`;
