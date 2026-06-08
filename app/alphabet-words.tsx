import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AlphabetBrowseList } from '@/src/components/AlphabetBrowseList';
import { GlassIconButton } from '@/src/components/GlassIconButton';
import { ScreenCanvas } from '@/src/components/ScreenCanvas';
import { SearchBar } from '@/src/components/SearchBar';
import { UnavailableWordNotice } from '@/src/components/UnavailableWordNotice';
import { colors, layout, spacing, typography } from '@/src/constants/theme';
import { useDictionary } from '@/src/context/DictionaryContext';
import {
  filterWordsForLetter,
  getWordCountForLetter,
} from '@/src/services/alphabetWordIndex';
import { getWordAvailability } from '@/src/services/wordAvailabilityCache';

function getLetterParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? 'a').trim().charAt(0).toLowerCase();
}

export default function AlphabetBrowseScreen() {
  const { letter: letterParam } = useLocalSearchParams<{ letter?: string | string[] }>();
  const letter = getLetterParam(letterParam);
  const insets = useSafeAreaInsets();
  const { clearError } = useDictionary();
  const [filter, setFilter] = useState('');
  const [filterHint, setFilterHint] = useState<string | null>(null);
  const [unavailableWord, setUnavailableWord] = useState<string | null>(null);
  const [listRevision, setListRevision] = useState(0);
  const deferredFilter = useDeferredValue(filter);

  useFocusEffect(
    useCallback(() => {
      setListRevision((current) => current + 1);
    }, []),
  );

  const total = useMemo(() => getWordCountForLetter(letter), [letter]);
  const words = useMemo(
    () => filterWordsForLetter(letter, deferredFilter),
    [letter, deferredFilter],
  );

  const goToWord = (word: string) => {
    if (getWordAvailability(word) === 'unavailable') {
      setUnavailableWord(word);
      return;
    }
    setUnavailableWord(null);
    setFilterHint(null);
    clearError();
    router.push({ pathname: '/word', params: { q: word.toLowerCase() } });
  };

  const bottomPad = Math.max(insets.bottom, spacing.md);

  return (
    <ScreenCanvas backgroundColor={colors.background} edges={['top', 'left', 'right']}>
      <View style={styles.hero}>
        <GlassIconButton name="arrow-back" onPress={() => router.back()} />
        <View style={styles.heroCopy}>
          <Text style={styles.eyebrow}>Learn by alphabet</Text>
          <Text style={styles.title}>Letter {letter.toUpperCase()}</Text>
          <Text style={styles.stats}>
            {total.toLocaleString()} words · some rare entries may have no definition
          </Text>
        </View>
        <View style={styles.letterBadge}>
          <Text style={styles.letterBadgeText}>{letter.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <SearchBar
          value={filter}
          onChangeText={(text) => {
            setFilter(text);
            if (text.trim()) {
              setFilterHint(null);
            }
          }}
          onSubmit={() => {
            if (!filter.trim()) {
              setFilterHint('Type part of a word to narrow this list.');
              return;
            }
            if (words[0]) {
              goToWord(words[0]);
              return;
            }
            setFilterHint(`No words starting with “${letter.toUpperCase()}” match your filter.`);
          }}
          placeholder={`Filter words starting with ${letter.toUpperCase()}…`}
          showSubmit={Boolean(filter.trim())}
          hint={filterHint}
          onDismissHint={() => setFilterHint(null)}
        />
      </View>

      <View style={[styles.listWrap, { paddingBottom: bottomPad }]}>
        {unavailableWord ? (
          <UnavailableWordNotice
            word={unavailableWord}
            onDismiss={() => setUnavailableWord(null)}
            onTryAnother={() => setUnavailableWord(null)}
          />
        ) : null}

        <AlphabetBrowseList
          letter={letter}
          words={words}
          total={total}
          filter={deferredFilter}
          listRevision={listRevision}
          onSelectWord={goToWord}
        />
      </View>
    </ScreenCanvas>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: 12,
    backgroundColor: colors.yellow,
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  heroCopy: { flex: 1 },
  eyebrow: { ...typography.caption, color: colors.orange, marginBottom: 2 },
  title: { ...typography.screenTitle, fontSize: 22, color: colors.text },
  stats: { ...typography.caption, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
  letterBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterBadgeText: { ...typography.screenTitle, fontSize: 24, color: colors.white },
  searchWrap: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },
});
