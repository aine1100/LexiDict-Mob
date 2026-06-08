# LexiGlow Theme Tokens

Copy into `src/constants/theme.ts`. Single source of truth for DictionaryApp UI.

## Colors

```typescript
export const colors = {
  // Canvas
  background: '#F9F9F9',       // Home / explore (iOS ref)
  backgroundSoft: '#F2F2F0',   // Voice / sheet screens

  // Brand — Pocket Dictionary
  red: '#ED4546',              // Word hero header
  redMuted: '#C93A3B',         // Secondary text on red
  yellow: '#FFDC4D',           // Bottom bar, onboarding canvas
  black: '#1E1E1E',            // Primary text, dark buttons

  // Accent — Translation / voice refs
  orange: '#FF6B35',           // Primary CTA, speaker, active states
  orangeSoft: '#F5A623',       // Borders, links, word-of-day ring
  orangeHighlight: 'rgba(255, 107, 53, 0.25)', // Active word outline

  // Neutrals
  white: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#1E1E1E',
  textSecondary: '#333333',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  iconBg: '#F3F4F6',           // Grey rounded square behind icons

  // Part-of-speech chips
  posNoun: '#E0E7FF',
  posVerb: '#DCFCE7',
  posAdj: '#FEF3C7',
  posAdv: '#FCE7F3',
  posDefault: '#F3F4F6',

  // Semantic
  error: '#DC2626',
  success: '#16A34A',

  // Glass
  glass: 'rgba(255, 255, 255, 0.88)',
  glassDark: 'rgba(30, 30, 30, 0.45)',
};
```

## Typography

```typescript
export const fonts = {
  display: 'SpaceGrotesk_700Bold',
  displayMedium: 'SpaceGrotesk_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
};

export const typography = {
  wordDisplay: { fontFamily: fonts.display, fontSize: 38, lineHeight: 44 },
  screenTitle: { fontFamily: fonts.displayMedium, fontSize: 28, lineHeight: 34 },
  sectionTitle: { fontFamily: fonts.bodySemiBold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18 },
  phonetic: { fontFamily: fonts.body, fontSize: 14, lineHeight: 20 },
  posLabel: { fontFamily: fonts.bodySemiBold, fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase' as const },
};
```

## Spacing & layout

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const layout = {
  screenPadding: 20,
  cardRadius: 20,
  sheetRadiusTop: 28,
  pillRadius: 999,
  iconButtonSize: 44,
  heroMinHeight: 260,
  sheetOverlap: 24,            // negative margin pulling sheet over hero
  bottomBarHeight: 72,
  alphabetColumns: 6,
};
```

## Shadows

```typescript
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
};
```

## Screen backgrounds

| Screen | `backgroundColor` |
|--------|-------------------|
| Onboarding | `colors.yellow` (top) + `colors.red` (footer curve) |
| Home | `colors.background` |
| Word detail hero | `colors.red` |
| Word detail sheet | `colors.white` |
| Drawer | `colors.white` |
| Modal / search | `colors.backgroundSoft` |
