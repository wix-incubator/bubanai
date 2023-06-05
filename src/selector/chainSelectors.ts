/**
 * Chain 2 selectors
 * @param first
 *
 * @category Selectors
 */
export const chainSelectors = (first: string) => (second: string) =>
  `${first} ${second}`;
