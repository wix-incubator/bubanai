export const MetaKeys = {
  ControlOrCommand: 0,
  Alt: 1,
} as const;

export const SpecialKeys = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Shift: 'Shift',
  Minus: 'Minus',
  Plus: '107',
  Backspace: 'Backspace',
  Delete: 'Delete',
  Escape: 'Escape',
  Enter: 'Enter',
} as const;

export type MetaKeysType = typeof MetaKeys[keyof typeof MetaKeys];
export type KeyboardKeysType = string | MetaKeysType;
