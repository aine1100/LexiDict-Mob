import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/src/constants/api';

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.searchHistory)
      .then((raw) => {
        if (raw) {
          setHistory(JSON.parse(raw) as string[]);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback(async (items: string[]) => {
    setHistory(items);
    await AsyncStorage.setItem(STORAGE_KEYS.searchHistory, JSON.stringify(items));
  }, []);

  const addWord = useCallback(async (word: string) => {
    const normalized = word.trim().toLowerCase();
    if (!normalized) return;

    setHistory((current) => {
      const next = [normalized, ...current.filter((w) => w !== normalized)].slice(0, 30);
      void AsyncStorage.setItem(STORAGE_KEYS.searchHistory, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeWord = useCallback(async (word: string) => {
    const normalized = word.trim().toLowerCase();
    if (!normalized) return;

    setHistory((current) => {
      const next = current.filter((item) => item !== normalized);
      void AsyncStorage.setItem(STORAGE_KEYS.searchHistory, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(async () => {
    await persist([]);
  }, [persist]);

  return { history, ready, addWord, removeWord, clearHistory };
}
