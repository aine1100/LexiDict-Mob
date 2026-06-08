const WORD_POOL = [
  'hello',
  'serendipity',
  'ephemeral',
  'dreidel',
  'eloquent',
  'resilient',
  'curious',
  'wander',
  'luminary',
  'harmony',
];

export function getWordOfDay(): string {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return WORD_POOL[dayIndex % WORD_POOL.length];
}
