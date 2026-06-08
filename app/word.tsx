import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomActionBar } from '@/src/components/BottomActionBar';
import { ContentSheet } from '@/src/components/ContentSheet';
import { ErrorState } from '@/src/components/ErrorState';
import { HeroHeader } from '@/src/components/HeroHeader';
import { LoadingState } from '@/src/components/LoadingState';
import { MeaningSection } from '@/src/components/MeaningSection';
import { colors, spacing, typography } from '@/src/constants/theme';
import { useDictionary } from '@/src/context/DictionaryContext';
import { fetchWord } from '@/src/services/dictionaryApi';
import { markWordAvailable, markWordUnavailable } from '@/src/services/wordAvailabilityCache';
import type { DictionaryEntry, DictionaryError } from '@/src/types/dictionary';
import {
  getAllMeanings,
  getAudioOptions,
  getFirstExample,
  getPrimaryPhonetic,
} from '@/src/utils/entryHelpers';
import { getWordParam } from '@/src/utils/routeParams';

function getErrorTitle(error: DictionaryError): string {
  switch (error.code) {
    case 'NOT_FOUND':
      return 'No dictionary entry';
    case 'NETWORK':
      return 'Connection problem';
    case 'VALIDATION':
      return 'Invalid search';
    default:
      return 'Something went wrong';
  }
}

export default function WordScreen() {
  const { q } = useLocalSearchParams<{ q: string | string[] }>();
  const word = getWordParam(q);
  const { history, addWord, isFavorite, toggleFavorite } = useDictionary();

  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<DictionaryError | null>(null);
  const [favoriteToast, setFavoriteToast] = useState<string | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    if (!word) {
      setLoading(false);
      setError({ code: 'VALIDATION', message: 'No word provided. Go back and search again.' });
      setEntry(null);
      return;
    }

    const currentRequest = ++requestId.current;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWord(word);
      if (currentRequest !== requestId.current) return;

      setEntry(data[0]);
      markWordAvailable(word);
      await addWord(word);
    } catch (err) {
      if (currentRequest !== requestId.current) return;
      setEntry(null);
      const dictionaryError = err as DictionaryError;
      if (dictionaryError.code === 'NOT_FOUND') {
        markWordUnavailable(word);
      }
      setError(dictionaryError);
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  }, [word, addWord]);

  useEffect(() => {
    load();
  }, [load]);

  const historyIndex = useMemo(
    () => history.findIndex((item) => item === word),
    [history, word],
  );

  const navigateHistory = (direction: -1 | 1) => {
    const nextIndex = historyIndex + direction;
    if (nextIndex < 0 || nextIndex >= history.length) return;
    router.replace({ pathname: '/word', params: { q: history[nextIndex] } });
  };

  const phonetic = entry ? getPrimaryPhonetic(entry) : undefined;
  const example = entry ? getFirstExample(entry) : undefined;
  const audioOptions = entry ? getAudioOptions(entry) : [];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <HeroHeader
        word={entry?.word ?? word}
        phonetic={phonetic}
        audioOptions={audioOptions}
        example={example}
        onBack={() => router.back()}
        onSearch={() => router.replace('/(drawer)/(tabs)/')}
      />

      <ContentSheet centerContent={!loading && Boolean(error)}>
        {loading ? <LoadingState /> : null}

        {!loading && error ? (
          <ErrorState
            title={getErrorTitle(error)}
            message={
              error.code === 'NOT_FOUND'
                ? 'This word is not in our dictionary yet. It may be rare, misspelled, or not supported. Try another word or check the spelling.'
                : error.message
            }
            onRetry={error.code === 'NOT_FOUND' ? undefined : load}
            retryLabel="Try again"
            onSecondaryAction={error.code === 'NOT_FOUND' ? () => router.back() : undefined}
            secondaryLabel="Go back"
          />
        ) : null}

        {!loading && !error && entry ? (
          <>
            {entry.origin ? (
              <View style={styles.originBlock}>
                <Text style={styles.originLabel}>Origin</Text>
                <Text style={styles.originText}>{entry.origin}</Text>
              </View>
            ) : null}

            {getAllMeanings(entry).map((meaning, index) => (
              <MeaningSection
                key={`${meaning.partOfSpeech}-${index}`}
                meaning={meaning}
                word={entry.word}
              />
            ))}
          </>
        ) : null}
      </ContentSheet>

      {!loading && !error && entry ? (
        <BottomActionBar
          canGoPrevious={historyIndex > 0}
          canGoNext={historyIndex >= 0 && historyIndex < history.length - 1}
          onPrevious={() => navigateHistory(-1)}
          onNext={() => navigateHistory(1)}
          isFavorite={word ? isFavorite(word) : false}
          onToggleFavorite={async () => {
            if (!word) return;
            const added = await toggleFavorite(word);
            const message = added ? 'Added to favorites' : 'Removed from favorites';
            setFavoriteToast(message);
            setTimeout(() => setFavoriteToast(null), 2000);
          }}
        />
      ) : null}

      {favoriteToast ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{favoriteToast}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.red },
  originBlock: { marginBottom: spacing.lg },
  originLabel: { ...typography.posLabel, color: colors.orange, marginBottom: 6 },
  originText: { ...typography.body, color: colors.textMuted },
  toast: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toastText: { ...typography.caption, color: colors.white },
});
