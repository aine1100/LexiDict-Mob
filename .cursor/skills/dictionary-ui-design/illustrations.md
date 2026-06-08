# Illustration Guide — DictionaryApp

Curated free sources. **Customize primary color to `#FF6B35` or `#ED4546`** before download so assets match LexiGlow.

## Recommended sources

| Platform | License | Best for | URL |
|----------|---------|----------|-----|
| **Storyset** | Free with attribution | Friendly characters, education, reading | [storyset.com/education](https://storyset.com/education) |
| **unDraw** | Open, no attribution | Minimal onboarding, books, search | [undraw.co](https://undraw.co/) |
| **Humaaans** | Free mix-and-match | Simple people + books | [humaaans.com](https://www.humaaans.com/) |

## Pick by screen

### Onboarding (Pocket Dictionary style)

| Asset | Source | Search / link | Notes |
|-------|--------|---------------|-------|
| Person on books stack | Storyset **Cuate** | [Reading book](https://storyset.com/illustration/reading-book/cuate) | Closest to Pocket Dictionary onboarding |
| Kids reading | Storyset **Cuate** | [Kids reading](https://storyset.com/illustration/kids-reading/cuate) | Warmer, younger feel |
| Books stack | unDraw | [Books](https://undraw.co/illustration/books_wxzz) | Set accent to `#ED4546` |
| Online learning | unDraw | Search "learning" on unDraw | Clean, professional |

**Save as:** `assets/illustrations/onboarding.png` (or `.svg` via `react-native-svg`)

### Home — Word of the Day mascot

| Asset | Source | Search / link | Notes |
|-------|--------|---------------|-------|
| Cute book character | Storyset **Bro** or **Cuate** | [Education](https://storyset.com/illustration/education/amico) | Place right side of WOTD card |
| Dictionary / vocabulary | Storyset | Search "dictionary" or "vocabulary" | |
| Book with face vibe | unDraw | Search "book" | Simpler flat style |

**Save as:** `assets/illustrations/mascot-word-day.png`  
**Size in UI:** ~96×96 inside card, `resizeMode: contain`

### Empty / error states

| State | Source | Search |
|-------|--------|--------|
| Word not found | unDraw | "void", "empty", "question" |
| No network | unDraw | "no data", "connection" |
| No history | unDraw | "notes", "void" |

**Save as:** `assets/illustrations/empty-not-found.png`, `empty-offline.png`

### Category icons (optional — use emoji first)

Storyset category circles can be replaced with emoji in v1: 🎉 📚 🎨 🔬  
For custom icons: [Storyset App illustrations](https://storyset.com/app) — download 4 small PNGs, 56×56.

## Download workflow

1. Open Storyset or unDraw link above.
2. Set color picker to **`#FF6B35`** (orange) or **`#ED4546`** (red).
3. Download **PNG** @2x for React Native (or SVG if using `react-native-svg`).
4. Place in `DictionaryApp/assets/illustrations/`.
5. Reference: `require('@/assets/illustrations/onboarding.png')`.

## Attribution (Storyset / Freepik)

If using Storyset assets in a published app, add to Settings → About:

> Illustrations by [Storyset](https://storyset.com/)

unDraw requires no attribution.

## Do not use

- Random Google Images (license risk)
- Watermarked stock photos
- Overly detailed illustrations on data-heavy screens (word detail)

## Placeholder until assets downloaded

Use `@expo/vector-icons` / `MaterialCommunityIcons`:
- `book-open-page-variant` — word of day
- `book-education` — onboarding
- `emoticon-sad-outline` — not found

Replace with PNG once illustrations are downloaded.
