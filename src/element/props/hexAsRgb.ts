/**
 * Returns hex color value in {r,g,b} format.
 * @param hex
 *
 * @category Element Properties
 */
export const hexAsRgb = (hex: string | null) => {
  if (!hex) {
    return null;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};
