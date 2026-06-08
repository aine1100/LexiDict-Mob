import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/src/constants/api';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.favorites)
      .then((raw) => {
        if (raw) {
          setFavorites(JSON.parse(raw) as string[]);
        }
      })
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback(async (items: string[]) => {
    setFavorites(items);
    await AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(items));
  }, []);

  const isFavorite = useCallback(
    (word: string) => {
      const normalized = word.trim().toLowerCase();
      return favorites.includes(normalized);
    },
    [favorites],
  );

  const addFavorite = useCallback(
    async (word: string) => {
      const normalized = word.trim().toLowerCase();
      if (!normalized || isFavorite(normalized)) return;

      setFavorites((current) => {
        const next = [normalized, ...current.filter((item) => item !== normalized)];
        void AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
        return next;
      });
    },
    [isFavorite],
  );

  const removeFavorite = useCallback(async (word: string) => {
    const normalized = word.trim().toLowerCase();
    if (!normalized) return;

    setFavorites((current) => {
      const next = current.filter((item) => item !== normalized);
      void AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(
    async (word: string) => {
      if (isFavorite(word)) {
        await removeFavorite(word);
        return false;
      }
      await addFavorite(word);
      return true;
    },
    [addFavorite, isFavorite, removeFavorite],
  );

  const clearFavorites = useCallback(async () => {
    await persist([]);
  }, [persist]);

  return {
    favorites,
    ready,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
