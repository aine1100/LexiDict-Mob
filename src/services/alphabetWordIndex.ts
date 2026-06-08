import wordMeta from '@/assets/data/words-meta.json';

type WordsByLetter = Record<string, string[]>;

let wordsByLetter: WordsByLetter | null = null;

function loadWordsByLetter(): WordsByLetter {
  if (!wordsByLetter) {
    // Lazy-load the full dictionary list only when browsing by letter.
    wordsByLetter = require('@/assets/data/words-by-letter.json') as WordsByLetter;
  }
  return wordsByLetter;
}

export const ALPHABET_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export function getWordCountForLetter(letter: string): number {
  return wordMeta.byLetter[letter.toLowerCase() as keyof typeof wordMeta.byLetter] ?? 0;
}

export function getTotalWordCount(): number {
  return wordMeta.total;
}

export function getWordsForLetter(letter: string): string[] {
  return loadWordsByLetter()[letter.toLowerCase()] ?? [];
}

export function filterWordsForLetter(letter: string, query: string): string[] {
  const normalized = query.trim().toLowerCase();
  const words = getWordsForLetter(letter);
  if (!normalized) {
    return words;
  }
  return words.filter((word) => word.includes(normalized));
}
