import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, typography } from '@/src/constants/theme';
import { getTotalWordCount } from '@/src/services/alphabetWordIndex';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const GAP = 8;
const COLS = layout.alphabetColumns;
const CELL_SIZE =
  (Dimensions.get('window').width - layout.screenPadding * 2 - GAP * (COLS - 1)) / COLS;

interface AlphabetGridProps {
  onSelectLetter: (letter: string) => void;
}

const totalWords = getTotalWordCount();

export function AlphabetGrid({ onSelectLetter }: AlphabetGridProps) {
  return (
    <View>
      <Text style={styles.title}>Learn by alphabet</Text>
      <Text style={styles.subtitle}>{totalWords.toLocaleString()} English words to explore</Text>
      <View style={styles.grid}>
        {LETTERS.map((letter) => (
          <Pressable
            key={letter}
            onPress={() => onSelectLetter(letter)}
            style={({ pressed }) => [styles.cell, pressed && styles.cellPressed]}>
            <Text style={styles.letter}>{letter}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...typography.sectionTitle, color: colors.text, marginBottom: 4 },
  subtitle: { ...typography.caption, color: colors.textMuted, marginBottom: 12 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: colors.iconBg,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellPressed: { backgroundColor: colors.orange, transform: [{ scale: 0.96 }] },
  letter: { ...typography.bodyMedium, color: colors.text },
});
