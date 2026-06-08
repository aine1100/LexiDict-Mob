import { StyleSheet, Text, View } from 'react-native';

import { ExampleQuote } from '@/src/components/ExampleQuote';
import { colors, getPartOfSpeechColor, spacing, typography } from '@/src/constants/theme';
import type { Meaning } from '@/src/types/dictionary';
import { getDefinitions } from '@/src/utils/entryHelpers';

interface MeaningSectionProps {
  meaning: Meaning;
  word: string;
}

export function MeaningSection({ meaning, word }: MeaningSectionProps) {
  const definitions = getDefinitions(meaning);

  return (
    <View style={styles.section}>
      <View style={[styles.chip, { backgroundColor: getPartOfSpeechColor(meaning.partOfSpeech) }]}>
        <Text style={styles.chipText}>{meaning.partOfSpeech}</Text>
      </View>
      {definitions.map((def, index) => (
        <View key={`${meaning.partOfSpeech}-${index}`} style={styles.definition}>
          <Text style={styles.number}>{index + 1}.</Text>
          <View style={styles.body}>
            <Text style={styles.definitionText}>{def.definition}</Text>
            {def.example ? <ExampleQuote example={def.example} highlightWord={word} /> : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: spacing.lg },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  chipText: { ...typography.posLabel, color: colors.text },
  definition: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  number: { ...typography.bodyMedium, color: colors.orange, width: 20 },
  body: { flex: 1 },
  definitionText: { ...typography.body, color: colors.text },
});
