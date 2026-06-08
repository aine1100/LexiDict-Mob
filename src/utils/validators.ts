export function validateSearchWord(word: string): string | null {
  const trimmed = word.trim();
  if (!trimmed) {
    return 'Please enter a word to search.';
  }
  if (!/^[a-zA-Z'-]+$/.test(trimmed)) {
    return 'Please use letters only.';
  }
  return null;
}
