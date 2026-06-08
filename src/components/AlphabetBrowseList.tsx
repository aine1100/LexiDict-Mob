import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItemInfo,
} from 'react-native';

import { colors, layout, shadows, spacing, typography } from '@/src/constants/theme';
import { getWordAvailability } from '@/src/services/wordAvailabilityCache';

interface AlphabetBrowseListProps {
  letter: string;
  words: string[];
  total: number;
  filter: string;
  listRevision?: number;
  onSelectWord: (word: string) => void;
}

export function AlphabetBrowseList({
  letter,
  words,
  total,
  filter,
  listRevision = 0,
  onSelectWord,
}: AlphabetBrowseListProps) {
  const subtitle = useMemo(() => {
    if (total === 0) {
      return 'No words found for this letter';
    }
    if (filter.trim()) {
      return `${words.length.toLocaleString()} match${words.length === 1 ? '' : 'es'} · ${total.toLocaleString()} total`;
    }
    return `${total.toLocaleString()} English words`;
  }, [filter, total, words.length]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      const unavailable = getWordAvailability(item) === 'unavailable';

      return (
        <Pressable
          onPress={() => onSelectWord(item)}
          style={({ pressed }) => [
            styles.row,
            unavailable && styles.rowUnavailable,
            pressed && styles.rowPressed,
          ]}>
          <View style={[styles.indexBadge, unavailable && styles.indexBadgeUnavailable]}>
            <Text style={[styles.indexText, unavailable && styles.indexTextUnavailable]}>
              {index + 1}
            </Text>
          </View>
          <View style={styles.wordCopy}>
            <Text style={[styles.wordText, unavailable && styles.wordTextUnavailable]}>{item}</Text>
            {unavailable ? <Text style={styles.unavailableLabel}>No dictionary entry</Text> : null}
          </View>
          <Ionicons
            name={unavailable ? 'alert-circle-outline' : 'chevron-forward'}
            size={18}
            color={unavailable ? colors.textLight : colors.orange}
          />
        </Pressable>
      );
    },
    [onSelectWord],
  );

  if (words.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <Ionicons name="search-outline" size={28} color={colors.textMuted} />
        <Text style={styles.emptyTitle}>No matches</Text>
        <Text style={styles.emptyText}>
          {filter.trim()
            ? `Nothing starting with “${letter.toUpperCase()}” matches “${filter}”.`
            : 'Try another letter.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.meta}>
        <Text style={styles.metaTitle}>Dictionary words</Text>
        <Text style={styles.metaSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.listCard}>
        <FlatList
          data={words}
          extraData={listRevision}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          initialNumToRender={24}
          maxToRenderPerBatch={32}
          windowSize={10}
          removeClippedSubviews
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  meta: { marginBottom: spacing.md },
  metaTitle: { ...typography.sectionTitle, fontSize: 18, color: colors.text },
  metaSubtitle: { ...typography.caption, color: colors.textMuted, marginTop: 4 },
  listCard: {
    flex: 1,
    minHeight: 420,
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius,
    borderWidth: 2,
    borderColor: colors.black,
    overflow: 'hidden',
    ...shadows.card,
  },
  listContent: { paddingVertical: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowPressed: { backgroundColor: colors.backgroundSoft },
  rowUnavailable: { opacity: 0.72 },
  wordCopy: { flex: 1 },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.orangeHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexBadgeUnavailable: { backgroundColor: colors.iconBg },
  indexText: { ...typography.caption, color: colors.orange, fontSize: 12 },
  indexTextUnavailable: { color: colors.textLight },
  wordText: {
    ...typography.bodyMedium,
    color: colors.text,
    textTransform: 'capitalize',
    fontSize: 17,
  },
  wordTextUnavailable: { color: colors.textMuted },
  unavailableLabel: { ...typography.caption, color: colors.textLight, marginTop: 2, fontSize: 11 },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: layout.screenPadding,
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius,
    borderWidth: 2,
    borderColor: colors.black,
    ...shadows.card,
  },
  emptyTitle: { ...typography.sectionTitle, color: colors.text, marginTop: 12 },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: 6 },
});
