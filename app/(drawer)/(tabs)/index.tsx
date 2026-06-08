import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CategoryScroll } from '@/src/components/CategoryScroll';
import { CategoryWordsPanel } from '@/src/components/CategoryWordsPanel';
import { GlassIconButton } from '@/src/components/GlassIconButton';
import { RecentSearches } from '@/src/components/RecentSearches';
import { SearchBar } from '@/src/components/SearchBar';
import { TabScreenLayout } from '@/src/components/TabScreenLayout';
import { WordOfDayCard } from '@/src/components/WordOfDayCard';
import type { WordCategory } from '@/src/constants/categories';
import { getWordOfDay } from '@/src/constants/wordOfDay';
import { layout, spacing } from '@/src/constants/theme';
import { useDictionary } from '@/src/context/DictionaryContext';
import { fetchWord } from '@/src/services/dictionaryApi';
import type { AudioOption } from '@/src/types/audio';
import {
  getAudioOptions,
  getFirstDefinitionSnippet,
  getPrimaryPhonetic,
} from '@/src/utils/entryHelpers';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { clearError, history } = useDictionary();
  const [query, setQuery] = useState('');
  const [searchHint, setSearchHint] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(null);
  const [wotd, setWotd] = useState({
    word: getWordOfDay(),
    phonetic: undefined as string | undefined,
    snippet: undefined as string | undefined,
    audioOptions: [] as AudioOption[],
  });

  const loadWordOfDay = useCallback(async () => {
    const word = getWordOfDay();
    try {
      const [entry] = await fetchWord(word);
      setWotd({
        word: entry.word,
        phonetic: getPrimaryPhonetic(entry),
        snippet: getFirstDefinitionSnippet(entry),
        audioOptions: getAudioOptions(entry),
      });
    } catch {
      setWotd({ word, phonetic: undefined, snippet: undefined, audioOptions: [] });
    }
  }, []);

  useEffect(() => {
    loadWordOfDay();
  }, [loadWordOfDay]);

  const goToWord = (word: string) => {
    const trimmed = word.trim();
    if (!trimmed) {
      setSearchHint('Type a word above, then tap search to look it up.');
      return;
    }
    setSearchHint(null);
    clearError();
    router.push({ pathname: '/word', params: { q: trimmed.toLowerCase() } });
  };

  const handleSearch = () => {
    if (selectedCategory) {
      const match = selectedCategory.words.find((item) =>
        item.toLowerCase().startsWith(query.trim().toLowerCase()),
      );
      if (match) {
        goToWord(match);
        return;
      }
      if (selectedCategory.words.includes(query.trim().toLowerCase())) {
        goToWord(query);
        return;
      }
    }

    if (!query.trim()) {
      setSearchHint('Type a word above, then tap search to look it up.');
      return;
    }
    goToWord(query);
  };

  const handleCategorySelect = (category: WordCategory) => {
    setSelectedCategory((current) => (current?.id === category.id ? null : category));
  };

  const openHistoryDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TabScreenLayout
      title="LexiDict"
      subtitle="Search and discover new words"
      leftAction={
        <GlassIconButton name="menu" onPress={openHistoryDrawer} />
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled">
        <SearchBar
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            if (text.trim()) {
              setSearchHint(null);
            }
          }}
          onSubmit={handleSearch}
          placeholder={
            selectedCategory ? `Search in ${selectedCategory.label}…` : 'Search a word…'
          }
          hint={searchHint}
          onDismissHint={() => setSearchHint(null)}
        />

        {history.length > 0 ? (
          <View style={styles.section}>
            <RecentSearches
              words={history}
              onSelectWord={goToWord}
              onSeeAll={openHistoryDrawer}
            />
          </View>
        ) : null}

        <View style={styles.section}>
          <CategoryScroll
            selectedCategoryId={selectedCategory?.id}
            onSelectCategory={handleCategorySelect}
          />
        </View>

        {selectedCategory ? (
          <View style={styles.section}>
            <CategoryWordsPanel
              category={selectedCategory}
              onSelectWord={goToWord}
              onClear={() => setSelectedCategory(null)}
            />
          </View>
        ) : null}

        <View style={styles.section}>
          <WordOfDayCard
            word={wotd.word}
            phonetic={wotd.phonetic}
            audioOptions={wotd.audioOptions}
            snippet={wotd.snippet}
            onPress={() => goToWord(wotd.word)}
          />
        </View>
      </ScrollView>
    </TabScreenLayout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  section: { marginTop: spacing.lg },
});
