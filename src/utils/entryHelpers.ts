import type { AudioOption } from '@/src/types/audio';
import type { Definition, DictionaryEntry, Meaning } from '@/src/types/dictionary';
import { normalizeAudioUrl } from '@/src/utils/normalizeAudioUrl';

export function getPrimaryPhonetic(entry: DictionaryEntry): string | undefined {
  if (entry.phonetic) return entry.phonetic;
  return entry.phonetics?.find((p) => p.text)?.text;
}

export function getAudioOptions(entry: DictionaryEntry): AudioOption[] {
  const options: AudioOption[] = [];

  (entry.phonetics ?? []).forEach((phonetic, index) => {
    const raw = phonetic.audio?.trim();
    if (!raw) return;

    options.push({
      id: `${entry.word}-audio-${index}`,
      label: phonetic.text?.trim() || guessAccentLabel(raw) || `Audio ${index + 1}`,
      url: normalizeAudioUrl(raw),
      text: phonetic.text,
    });
  });

  return options;
}

export function getAudioUrl(entry: DictionaryEntry): string | undefined {
  return getAudioOptions(entry)[0]?.url;
}

function guessAccentLabel(url: string): string | undefined {
  const lower = url.toLowerCase();
  if (lower.includes('-uk') || lower.includes('_gb')) return 'UK';
  if (lower.includes('-us') || lower.includes('_us')) return 'US';
  if (lower.includes('-au') || lower.includes('_au')) return 'AU';
  return undefined;
}

export function getFirstExample(entry: DictionaryEntry): string | undefined {
  for (const meaning of entry.meanings ?? []) {
    for (const def of meaning.definitions ?? []) {
      if (def.example) return def.example;
    }
  }
  return undefined;
}

export function getFirstDefinitionSnippet(entry: DictionaryEntry): string | undefined {
  const first = entry.meanings?.[0]?.definitions?.[0];
  if (!first) return undefined;
  const pos = entry.meanings[0].partOfSpeech;
  return `${capitalize(pos)} — ${first.definition}`;
}

export function getAllMeanings(entry: DictionaryEntry): Meaning[] {
  return entry.meanings ?? [];
}

export function getDefinitions(meaning: Meaning): Definition[] {
  return meaning.definitions ?? [];
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
