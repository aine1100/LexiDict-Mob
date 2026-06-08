/**
 * LexiGlow design tokens — see .cursor/skills/dictionary-ui-design/theme-tokens.md
 */
export const colors = {
  background: '#F9F9F9',
  backgroundSoft: '#F2F2F0',
  red: '#ED4546',
  redMuted: '#C93A3B',
  yellow: '#FFDC4D',
  black: '#1E1E1E',
  orange: '#FF6B35',
  orangeSoft: '#F5A623',
  orangeHighlight: 'rgba(255, 107, 53, 0.25)',
  white: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#1E1E1E',
  textSecondary: '#333333',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  iconBg: '#F3F4F6',
  posNoun: '#E0E7FF',
  posVerb: '#DCFCE7',
  posAdj: '#FEF3C7',
  posAdv: '#FCE7F3',
  posDefault: '#F3F4F6',
  error: '#DC2626',
  success: '#16A34A',
  glass: 'rgba(255, 255, 255, 0.88)',
  glassDark: 'rgba(30, 30, 30, 0.45)',
} as const;

export const fonts = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export const typography = {
  wordDisplay: { fontFamily: fonts.display, fontSize: 38, lineHeight: 44 },
  screenTitle: { fontFamily: fonts.displayMedium, fontSize: 28, lineHeight: 34 },
  sectionTitle: { fontFamily: fonts.bodySemiBold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: fonts.bodyMedium, fontSize: 16, lineHeight: 24 },
  bodySemiBold: { fontFamily: fonts.bodySemiBold, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18 },
  phonetic: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },
  posLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const layout = {
  screenPadding: 20,
  cardRadius: 20,
  sheetRadiusTop: 28,
  pillRadius: 999,
  iconButtonSize: 44,
  heroMinHeight: 260,
  sheetOverlap: 24,
  bottomBarHeight: 72,
  floatingTabBarHeight: 64,
  floatingTabBarBottomGap: 12,
  tabContentBottomInset: 96,
  alphabetColumns: 6,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  fab: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;

const posColorMap: Record<string, string> = {
  noun: colors.posNoun,
  verb: colors.posVerb,
  adjective: colors.posAdj,
  adverb: colors.posAdv,
};

export function getPartOfSpeechColor(partOfSpeech: string): string {
  return posColorMap[partOfSpeech.toLowerCase()] ?? colors.posDefault;
}
