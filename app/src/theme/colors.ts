export const colors = {
  // Brand / primary
  primary: '#a50000',
  primaryHover: '#c10007',
  primaryFg: '#ffffff',

  // Neutral text
  textPrimary: '#0a0a0a',
  textSecondary: '#364153',
  textMuted: '#6a7282',
  textSubtle: '#717182',
  textInverse: '#ffffff',
  heading: '#101828',

  // Backgrounds
  bgApp: '#f8f9fa',
  bgSurface: '#ffffff',
  bgMuted: '#f3f3f5',
  bgSubtle: '#f9fafb',

  // Borders
  border: '#e5e7eb',
  borderStrong: '#cfd4dc',

  // Semantic - success
  successBg: '#f0fdf4',
  successBorder: '#b9f8cf',
  successFg: '#008236',
  successAccent: '#2e7d32',

  // Semantic - info
  infoBg: '#eff6ff',
  infoBorder: '#bedbff',
  infoFg: '#1447e6',

  // Semantic - warning
  warningBg: '#fff7ed',
  warningBgStrong: '#ffedd4',
  warningBorder: '#ffd6a8',
  warningFg: '#ca3500',
  warningAccent: '#9f2d00',
  warningIcon: '#ffa726',

  // Semantic - danger
  dangerBg: '#fef2f2',
  dangerBorder: '#ffc9c9',
  dangerFg: '#c10007',
  dangerAccent: '#d32f2f',
} as const;

export type ColorToken = keyof typeof colors;
