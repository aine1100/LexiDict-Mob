import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, typography } from '@/src/constants/theme';

interface RecentSearchesProps {
  words: string[];
  onSelectWord: (word: string) => void;
  onSeeAll: () => void;
}

export function RecentSearches({ words, onSelectWord, onSeeAll }: RecentSearchesProps) {
  const recent = words.slice(0, 3);
  if (recent.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent searches</Text>
        <Pressable onPress={onSeeAll} hitSlop={8} style={({ pressed }) => pressed && styles.pressed}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {recent.map((word) => (
          <Pressable
            key={word}
            onPress={() => onSelectWord(word)}
            style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}>
            <Ionicons name="time-outline" size={16} color={colors.orange} />
            <Text style={styles.word} numberOfLines={1}>
              {word}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textLight} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { ...typography.sectionTitle, fontSize: 17, color: colors.text },
  seeAll: { ...typography.caption, color: colors.orange },
  pressed: { opacity: 0.85 },
  list: { gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipPressed: { backgroundColor: colors.backgroundSoft },
  word: {
    ...typography.bodyMedium,
    color: colors.text,
    textTransform: 'capitalize',
    flex: 1,
  },
});
