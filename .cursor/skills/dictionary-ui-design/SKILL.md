---
name: dictionary-ui-design
description: >-
  Builds the LexiTech Dictionary app UI by blending Pocket Dictionary (red/yellow
  hero), iOS explore home (word-of-day, categories, alphabet), translation app
  (orange CTAs, glass cards), and voice UI (bottom sheets, listening states).
  Use when designing screens, components, theme tokens, illustrations, or
  polishing React Native UI for DictionaryApp.
---

# Dictionary UI Design — LexiGlow System

A fused design language for **DictionaryApp** (Expo 54, iOS + Android). Read [theme-tokens.md](theme-tokens.md) for exact values. Read [illustrations.md](illustrations.md) before adding assets.

## Design DNA (4 references → 1 system)

| Source | Steal this | Skip this |
|--------|------------|-----------|
| **Pocket Dictionary** | Red hero header, yellow energy, overlapping white card, phonetic pill, bookmark CTA | Spanish translation row (API is English-only) |
| **iOS Explore Home** | Word-of-the-day card, orange accent borders, category chips, alphabet grid, hamburger drawer, mascot illustration | AR camera scanning (out of scope v1) |
| **Translation / Camera UI** | Orange primary buttons, floating white cards (28px radius), glass icon buttons, bottom mode bar, orange highlight on active text | Multi-language flags, OCR overlays |
| **Voice / Bottom Sheet UI** | Soft beige canvas, draggable sheet with handle, orange circular FAB, bold vs muted text hierarchy, "Listening…" microcopy for loading | Live transcription (voice search = v2) |

## LexiGlow principles

1. **One hero moment per screen** — word title OR word-of-day OR search prompt; never compete.
2. **Warm orange = action** — buttons, active letter, links, speaker pulse. Red = word hero zone. Yellow = secondary energy (bottom bar, highlights).
3. **Cards float, content breathes** — 20px screen padding, 24–28px card radius, subtle shadow (`shadowOpacity: 0.08`, `elevation: 4`).
4. **Illustration = emotion only** — onboarding + word-of-day mascot. Data screens stay clean.
5. **Progressive depth** — background → colored hero → overlapping white sheet → fixed bottom bar.
6. **Cross-platform parity** — same layout; only safe-area and status-bar style differ.

## Screen map

```
Onboarding → Home (Explore) → Word Detail
                ↑                ↑
           Drawer (history) ─────┘
                ↑
         Search overlay (modal)
```

| Screen | Layout recipe |
|--------|----------------|
| **Onboarding** | Yellow top 60% + copy + illustration; red curved footer; black bookmark "Let's Start" |
| **Home** | Off-white bg; top bar (menu, search icons in grey rounded squares); Word-of-Day card (orange border + mascot right); horizontal category scroll; alphabet grid (6 cols); tap letter → prefill search |
| **Word Detail** | Red hero (~38% height): back, word (lowercase, huge, white), phonetic pill, first example; white sheet overlaps hero with `-marginTop: 24`; meanings + origin inside sheet; yellow bottom bar (prev / learned / next) |
| **Drawer** | White panel; "Recent searches" header; list rows with word + phonetic; tap → fetch + close |
| **Search modal** | Glass/blur top bar; floating white card; input + orange Search pill; inline validation |
| **Error** | Centered in white sheet: illustration optional, title, message, orange Retry pill |

## Component checklist

Build these once in `src/components/`:

| Component | Key props / behavior |
|-----------|---------------------|
| `ScreenCanvas` | SafeArea + bg color per screen type |
| `GlassIconButton` | 44×44, `rgba(255,255,255,0.85)`, blur on iOS, icon centered |
| `WordOfDayCard` | Orange border, word, phonetic pill, truncated definition, mascot `Image` right |
| `CategoryChip` | Circle 56px, soft tinted bg, emoji or `@expo/vector-icons` |
| `AlphabetGrid` | 6 columns, grey cells, black fill when selected |
| `HeroHeader` | Red bg, `word`, `phonetic`, `onPlayAudio`, `example` |
| `PhoneticPill` | White pill on red OR orange speaker + `[ ipa ]` on card |
| `ContentSheet` | White, `borderTopLeftRadius: 28`, overlaps hero |
| `MeaningSection` | Part-of-speech chip (color-coded) + numbered definitions |
| `ExampleQuote` | Left orange bar OR italic; **bold the searched word** in example (translation-app pattern) |
| `BottomActionBar` | Yellow strip; circular black prev/next; center yellow "learned" pill |
| `SearchBar` | Rounded 16, light grey fill, orange search button |
| `ErrorState` | Icon + message + orange Retry |
| `LoadingState` | Skeleton in sheet OR "Looking up…" with orange dot pulse |

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Word display | Space Grotesk (Clash Grotesk substitute) | 36–40 | 700 |
| Screen title | Space Grotesk | 28 | 600 |
| Body / definitions | Inter | 16 | 400, lineHeight 24 |
| Caption / POS label | Inter | 12–13 | 600, letterSpacing 0.5 |
| Phonetic | Inter | 14 | 400, muted |

Load via `@expo-google-fonts/inter` + `@expo-google-fonts/space-grotesk` + `expo-font`.

## Motion (keep subtle)

- Sheet slide-up: 280ms `ease-out`
- Card press: `scale(0.98)` 100ms
- Speaker tap: pulse ring on orange icon
- Alphabet select: background fill 150ms
- Drawer: default React Navigation drawer animation

## API → UI mapping

| API field | UI placement |
|-----------|--------------|
| `word` | Hero title (lowercase stylistically) |
| `phonetic` / `phonetics[].text` | Phonetic pill |
| `phonetics[].audio` | Speaker icon (hide if empty) |
| `meanings[].partOfSpeech` | Colored chip in sheet |
| `definitions[].definition` | Numbered list item |
| `definitions[].example` | ExampleQuote; bold `word` substring |
| `origin` | "Word origin" card with small icon |

## Implementation rules

- Use `theme.ts` tokens — never hardcode hex in components.
- Use `expo-image` for illustrations (SVG via `react-native-svg` or PNG).
- Use `BlurView` from `expo-blur` for glass buttons (optional; fallback semi-transparent white).
- Orange CTA minimum touch target: 48×48.
- Support dynamic type: allow `fontScale` up to 1.3 without clipping hero.
- Dark mode: **v1 light only**; set `userInterfaceStyle: "light"` in `app.json`.

## When building a new screen

1. Pick screen recipe from table above.
2. Pull tokens from [theme-tokens.md](theme-tokens.md).
3. Place illustration per [illustrations.md](illustrations.md).
4. Map API data before styling empty states.
5. Verify: empty search, 404, no audio, long definitions, drawer history tap.

## Quality bar ("mind-blowing" checklist)

- [ ] Word-of-day card visible within 1 second of home load
- [ ] Hero + overlapping sheet visible on first successful search
- [ ] Speaker icon only when audio URL exists
- [ ] Searched word bolded inside example sentences
- [ ] Orange used on ≤3 element types per screen (avoid rainbow)
- [ ] One mascot illustration on home; none cluttering detail view
- [ ] Drawer history deduped, newest first
- [ ] Retry button on every error state
