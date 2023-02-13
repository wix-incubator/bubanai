export const DateFormats = {
  MM_DD_YYYY: 'MM/DD/YYYY',
  DD_MM_YYYY: 'DD/MM/YYYY',
  YYYY_MM_DD: 'YYYY/MM/DD',
  YYYY_M_D: 'YYYY/M/D',
} as const;

export type DateFormat = typeof DateFormats[keyof typeof DateFormats];
