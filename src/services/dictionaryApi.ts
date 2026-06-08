import axios from 'axios';

import { DICTIONARY_API_BASE } from '@/src/constants/api';
import type { DictionaryEntry, DictionaryError } from '@/src/types/dictionary';

function toError(code: DictionaryError['code'], message: string): DictionaryError {
  return { code, message };
}

function isDictionaryError(error: unknown): error is DictionaryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

export async function fetchWord(word: string): Promise<DictionaryEntry[]> {
  const trimmed = word.trim().toLowerCase();
  if (!trimmed) {
    throw toError('VALIDATION', 'Please enter a word to search.');
  }

  try {
    const response = await axios.get<DictionaryEntry[]>(
      `${DICTIONARY_API_BASE}/${encodeURIComponent(trimmed)}`,
      {
        timeout: 15000,
        headers: {
          Accept: 'application/json',
        },
        validateStatus: (status) => status < 500,
      },
    );

    if (response.status === 404) {
      throw toError('NOT_FOUND', 'Word not found. Try another spelling.');
    }

    if (response.status === 429) {
      throw toError('SERVER', 'Too many requests. Wait a moment and try again.');
    }

    if (response.status >= 400) {
      throw toError('SERVER', `Dictionary service error (${response.status}). Please try again.`);
    }

    const data = response.data;
    if (!Array.isArray(data) || data.length === 0 || !data[0]?.word) {
      throw toError('UNKNOWN', 'Unable to read response. Try again.');
    }

    return data;
  } catch (error) {
    if (isDictionaryError(error)) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw toError('NETWORK', 'Request timed out. Check your connection and try again.');
      }
      if (!error.response) {
        throw toError('NETWORK', 'No internet connection. Check your network.');
      }
      if (error.response.status === 404) {
        throw toError('NOT_FOUND', 'Word not found. Try another spelling.');
      }
      throw toError('SERVER', 'Something went wrong. Please try again.');
    }

    throw toError('UNKNOWN', 'Something went wrong. Please try again.');
  }
}
