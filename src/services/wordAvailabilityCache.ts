const availableWords = new Set<string>();
const unavailableWords = new Set<string>();
const MAX_CACHE_SIZE = 1000;

export type WordAvailability = 'available' | 'unavailable' | 'unknown';

function normalize(word: string): string {
  return word.trim().toLowerCase();
}

function trimCache(set: Set<string>) {
  if (set.size <= MAX_CACHE_SIZE) return;
  const overflow = set.size - MAX_CACHE_SIZE;
  const keys = set.values();
  for (let index = 0; index < overflow; index += 1) {
    const next = keys.next();
    if (next.done) break;
    set.delete(next.value);
  }
}

export function getWordAvailability(word: string): WordAvailability {
  const key = normalize(word);
  if (availableWords.has(key)) return 'available';
  if (unavailableWords.has(key)) return 'unavailable';
  return 'unknown';
}

export function markWordAvailable(word: string) {
  const key = normalize(word);
  unavailableWords.delete(key);
  availableWords.add(key);
  trimCache(availableWords);
}

export function markWordUnavailable(word: string) {
  const key = normalize(word);
  availableWords.delete(key);
  unavailableWords.add(key);
  trimCache(unavailableWords);
}
