# LexiDict

A React Native dictionary app built with Expo. Look up English words, browse by category or alphabet, hear pronunciations, and keep a searchable history of recent lookups.

## Features

- **Word search** — Look up definitions via the [Free Dictionary API](https://dictionaryapi.dev/)
- **Word detail** — Meanings, examples, origin, phonetics, and pronunciation audio
- **Audio player** — Play, pause, resume, skip ±5s, and switch between accents (only plays when you tap play)
- **Categories** — Curated word lists (animals, food, travel, etc.)
- **Alphabet browse** — 370,000+ English words with filter and pagination-friendly list UX
- **Word of the Day** — Daily featured word on the home screen
- **Favorites** — Save words from the word detail screen; view and manage in the Favorites tab
- **Search history** — Side drawer with per-item delete, custom confirm dialogs, pagination, and clear all
- **Recent on home** — Three most recent searches on the home screen with “See all” opening the drawer
- **Bottom navigation** — Floating tab bar: Home, Alphabet, Favorites (Ionicons)
- **Onboarding** — First-launch welcome screen

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Expo SDK 54, React Native 0.81 |
| Navigation | expo-router, drawer + bottom tabs (custom floating bar) |
| Language | TypeScript |
| API | axios → `dictionaryapi.dev` |
| Audio | expo-audio |
| Storage | AsyncStorage (history, onboarding) |
| Fonts | Inter, Space Grotesk |

## Project structure

```
app/
  index.tsx           # Onboarding gate
  onboarding.tsx
  (drawer)/(tabs)/index.tsx    # Home screen
  (drawer)/(tabs)/alphabet.tsx # Alphabet grid
  (drawer)/(tabs)/favorites.tsx
  alphabet-words.tsx  # Letter word list (from alphabet tab)
  word.tsx            # Word detail
src/
  components/         # UI (SearchBar, PronunciationPlayer, etc.)
  constants/          # Theme, categories, word-of-day
  context/            # DictionaryContext
  hooks/              # Audio, history, onboarding
  services/           # API, word index, availability cache
  utils/
assets/
  data/               # words-by-letter.json, words-meta.json
  illustration/
```

## Getting started

### Prerequisites

- Node.js 18+
- npm
- [Expo Go](https://expo.dev/go) on your device, or an emulator

### Install and run

```bash
npm install
npx expo start
```

Press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

Clear Metro cache after large data or routing changes:

```bash
npx expo start --clear
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Start with Android |
| `npm run ios` | Start with iOS |
| `npm run lint` | Run ESLint |
| `npm run generate:words` | Regenerate alphabet word lists from `scripts/words_alpha.txt` |

## Word list data

Alphabet browse uses bundled English word lists under `assets/data/`. To regenerate:

1. Download `words_alpha.txt` into `scripts/` (or run the generator once with network).
2. Run `npm run generate:words`.

The full list (~4.4 MB JSON) is lazy-loaded per letter so the home screen stays fast.

## Design

UI follows the **LexiGlow** design system (yellow hero, red word screens, orange CTAs). See `.cursor/skills/dictionary-ui-design/` for tokens and illustration notes.

## API notes

- Definitions come from `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- Not every word in the browse list has a dictionary entry; unavailable words are marked after a failed lookup
- No API key required; respect rate limits in production

## License

Private project — add your license if you open-source it.
