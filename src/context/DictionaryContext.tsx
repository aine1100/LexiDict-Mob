import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { useFavorites } from '@/src/hooks/useFavorites';
import { useSearchHistory } from '@/src/hooks/useSearchHistory';
import { fetchWord } from '@/src/services/dictionaryApi';
import type { DictionaryEntry, DictionaryError } from '@/src/types/dictionary';
import { validateSearchWord } from '@/src/utils/validators';

interface DictionaryContextValue {
  entries: DictionaryEntry[];
  loading: boolean;
  error: DictionaryError | null;
  history: string[];
  historyReady: boolean;
  favorites: string[];
  favoritesReady: boolean;
  searchWord: (word: string) => Promise<boolean>;
  addWord: (word: string) => Promise<void>;
  removeWord: (word: string) => Promise<void>;
  isFavorite: (word: string) => boolean;
  toggleFavorite: (word: string) => Promise<boolean>;
  removeFavorite: (word: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
  clearError: () => void;
  clearHistory: () => Promise<void>;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DictionaryError | null>(null);
  const { history, ready: historyReady, addWord, removeWord, clearHistory } = useSearchHistory();
  const {
    favorites,
    ready: favoritesReady,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  } = useFavorites();

  const searchWord = useCallback(
    async (word: string) => {
      const validationMessage = validateSearchWord(word);
      if (validationMessage) {
        setError({ code: 'VALIDATION', message: validationMessage });
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchWord(word);
        setEntries(data);
        await addWord(word);
        return true;
      } catch (err) {
        const dictionaryError = err as DictionaryError;
        setEntries([]);
        setError(dictionaryError);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [addWord],
  );

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      entries,
      loading,
      error,
      history,
      historyReady,
      favorites,
      favoritesReady,
      searchWord,
      addWord,
      removeWord,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      clearError,
      clearHistory,
    }),
    [
      entries,
      loading,
      error,
      history,
      historyReady,
      favorites,
      favoritesReady,
      searchWord,
      addWord,
      removeWord,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      clearError,
      clearHistory,
    ],
  );

  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within DictionaryProvider');
  }
  return context;
}
