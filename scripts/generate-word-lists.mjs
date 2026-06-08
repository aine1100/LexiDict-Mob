import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(__dirname, 'words_alpha.txt');
const outputPath = join(__dirname, '..', 'assets', 'data', 'words-by-letter.json');
const metaOutputPath = join(__dirname, '..', 'assets', 'data', 'words-meta.json');

const words = readFileSync(sourcePath, 'utf8')
  .split(/\r?\n/)
  .map((word) => word.trim().toLowerCase())
  .filter((word) => word.length >= 2 && /^[a-z]+$/.test(word));

const byLetter = {};
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
  byLetter[letter] = [];
}

for (const word of words) {
  const letter = word[0];
  if (byLetter[letter]) {
    byLetter[letter].push(word);
  }
}

writeFileSync(outputPath, JSON.stringify(byLetter));

const counts = {};
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
  counts[letter] = byLetter[letter].length;
}
const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
writeFileSync(metaOutputPath, JSON.stringify({ total, byLetter: counts }));

console.log(`Wrote ${total} words to ${outputPath}`);
console.log(`Wrote metadata to ${metaOutputPath}`);
for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
  console.log(`${letter}: ${byLetter[letter].length}`);
}
