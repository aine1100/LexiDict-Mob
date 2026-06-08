export interface Phonetic {
  text?: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
}

export type DictionaryErrorCode = 'NOT_FOUND' | 'NETWORK' | 'SERVER' | 'VALIDATION' | 'UNKNOWN';

export interface DictionaryError {
  code: DictionaryErrorCode;
  message: string;
}
