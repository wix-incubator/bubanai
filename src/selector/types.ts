export const AttributeType = {
  DATA_HOOK: 'data-hook',
  DATA_COMP: 'data-comp',
  DATA_AID: 'data-aid',
  DATA_TEST_ID: 'data-testid',
  DATA_REACTID: 'data-reactid',
  DATA_OPTION: 'data-option',
  DATA_STATE: 'data-state',
  DATA_CLASS: 'data-class',
  DATA_SRCSET: 'data-srcset',
  DATA_ID: 'data-id',
  DATA_SELECTED: 'data-selected',
  DATA_PRESET_INDEX: 'data-preset-index',
  DATA_TOGGLE_STATE: 'data-toggle-state',
  DATA_SKINPART: 'data-skinpart',
  DATA_LAYER_LEVEL: 'data-layer-level',
  CLASS: 'class',
  NAME: 'name',
  ROLE: 'role',
  DATA_TYPE: 'data-type',
  DATA_AUTOMATION_ID: 'data-automation-id',
  VALUE: 'value',
  DATA_COMP_ID: 'data-comp-id',
  DATA_PRESET_ID: 'data-preset-id',
  DATA_ITEM_ID: 'data-item-id',
  ID: 'id',
  TAB: 'tab',
  STYLE: 'style',
  DATA_SRC: 'data-src',
  SRC: 'src',
  SRCSET: 'srcset',
  ALT: 'alt',
  HREF: 'href',
  ARIA_CHECKED: 'aria-checked',
  ARIA_HIDDEN: 'aria-hidden',
  DATA_DISABLED: 'data-disabled',
  DATA_IS_HIDDEN: 'data-is-hidden',
  DATA_VIDEO_INFO: 'data-video-info',
  DATA_PLAYER_NAME: 'data-player-name',
  DATA_SVG_TYPE: 'data-svg-type',
  DATA_SVG_ID: 'data-svg-id',
} as const;
export type AttributeType =
  | typeof AttributeType[keyof typeof AttributeType]
  | string;

export const AttributeMatcher = {
  CONTAINS: '*=',
  EQUALS: '=',
  STARTS_WITH: '^=',
  ENDS_WITH: '$=',
} as const;
export type AttributeMatcher =
  typeof AttributeMatcher[keyof typeof AttributeMatcher];
