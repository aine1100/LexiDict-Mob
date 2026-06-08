import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/src/constants/api';

export function useOnboarding() {
  const [ready, setReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const refresh = useCallback(async () => {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.hasOnboarded);
    setHasOnboarded(value === 'true');
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.hasOnboarded, 'true');
    setHasOnboarded(true);
  }, []);

  const resetOnboarding = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.hasOnboarded);
    setHasOnboarded(false);
  }, []);

  return { ready, hasOnboarded, completeOnboarding, resetOnboarding, refresh };
}
