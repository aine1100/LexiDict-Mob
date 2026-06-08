import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { WordCategory } from '@/src/constants/categories';
import { colors, layout, shadows, typography } from '@/src/constants/theme';

interface CategoryWordsPanelProps {
  category: WordCategory;
  onSelectWord: (word: string) => void;
  onClear: () => void;
}

export function CategoryWordsPanel({ category, onSelectWord, onClear }: CategoryWordsPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.iconWrap, { backgroundColor: category.tint }]}>
            <Ionicons name={category.icon} size={20} color={colors.text} />
          </View>
          <View>
            <Text style={styles.title}>{category.label}</Text>
            <Text style={styles.subtitle}>Top words in this category</Text>
          </View>
        </View>
        <Pressable onPress={onClear} hitSlop={8}>
          <Text style={styles.clear}>Clear</Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {category.words.map((word) => (
          <Pressable
            key={word}
            onPress={() => onSelectWord(word)}
            style={({ pressed }) => [styles.wordChip, pressed && styles.wordChipPressed]}>
            <Text style={styles.wordText}>{word}</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.orange} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.white,
    borderRadius: layout.cardRadius,
    padding: layout.screenPadding,
    borderWidth: 2,
    borderColor: colors.orangeSoft,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...typography.sectionTitle, fontSize: 17, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
  clear: { ...typography.caption, color: colors.orange },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: layout.pillRadius,
    backgroundColor: colors.iconBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  wordChipPressed: { opacity: 0.85, borderColor: colors.orangeSoft },
  wordText: { ...typography.bodyMedium, color: colors.text, textTransform: 'capitalize' },
});
