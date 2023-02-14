export const getColorParts = (value: string) => {
  const parts = value.split(/(\(|\))/g);
  return (parts[2] || '').split(',');
};
